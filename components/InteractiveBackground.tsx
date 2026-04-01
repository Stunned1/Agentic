"use client";
import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_SPACING = 28;
    const DOT_RADIUS = 1;
    const MAX_GLOW_DIST = 180;
    const PARALLAX_STRENGTH = 0.018;

    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // offset entire grid slightly based on mouse (parallax)
      const offsetX = (mx - width / 2) * PARALLAX_STRENGTH;
      const offsetY = (my - height / 2) * PARALLAX_STRENGTH;

      const cols = Math.ceil(width / DOT_SPACING) + 2;
      const rows = Math.ceil(height / DOT_SPACING) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * DOT_SPACING - (DOT_SPACING / 2) + offsetX;
          const baseY = j * DOT_SPACING - (DOT_SPACING / 2) + offsetY;

          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // dots near cursor get brighter and slightly larger
          const proximity = Math.max(0, 1 - dist / MAX_GLOW_DIST);
          const alpha = 0.18 + proximity * 0.65;
          const radius = DOT_RADIUS + proximity * 1.4;

          // purple tint near cursor, grey-blue far away
          const r = Math.round(80 + proximity * 100);
          const g = Math.round(80 + proximity * 20);
          const b = Math.round(100 + proximity * 155);

          ctx.beginPath();
          ctx.arc(baseX, baseY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }

      // soft radial glow under cursor
      if (mx > 0) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
        grd.addColorStop(0, "rgba(139,92,246,0.07)");
        grd.addColorStop(1, "rgba(139,92,246,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
