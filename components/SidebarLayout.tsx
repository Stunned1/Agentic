"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";

function ParallaxDots() {
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
    let width = 0, height = 0;

    function resize() {
      if (!canvas) return;
      const pane = canvas.closest(".overflow-y-auto") as HTMLElement;
      width = canvas.width = pane ? pane.offsetWidth : window.innerWidth;
      height = canvas.height = pane ? pane.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const offsetX = (mx - width / 2) * PARALLAX_STRENGTH;
      const offsetY = (my - height / 2) * PARALLAX_STRENGTH;
      const cols = Math.ceil(width / DOT_SPACING) + 2;
      const rows = Math.ceil(height / DOT_SPACING) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * DOT_SPACING - DOT_SPACING / 2 + offsetX;
          const baseY = j * DOT_SPACING - DOT_SPACING / 2 + offsetY;
          const dx = baseX - mx, dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / MAX_GLOW_DIST);
          const alpha = 0.1 + proximity * 0.35;
          const radius = DOT_RADIUS + proximity * 1.2;
          const r = Math.round(80 + proximity * 100);
          const g = Math.round(80 + proximity * 20);
          const b = Math.round(100 + proximity * 155);
          ctx.beginPath();
          ctx.arc(baseX, baseY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }

      if (mx > -9000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
        grd.addColorStop(0, "rgba(139,92,246,0.035)");
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

  return <canvas ref={canvasRef} className="sticky top-0 w-full pointer-events-none z-0 -mb-[100vh]" style={{ height: '100vh' }} />;
}

export default function SidebarLayout({ children, profile }: { children: React.ReactNode; profile?: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const sidebarW = expanded ? "13rem" : "3.5rem";

  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <Sidebar expanded={expanded} onToggle={() => setExpanded((v) => !v)} profile={profile} />

      <div
        className="transition-all duration-300 flex-1 p-3 overflow-hidden"
        style={{ marginLeft: sidebarW }}
      >
        <div className="relative h-full bg-[#0f0f17] rounded-2xl border border-white/[0.06] overflow-y-auto shadow-2xl">
          <ParallaxDots />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
