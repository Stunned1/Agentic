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

    const GRID_SPACING = 40;
    const PARALLAX_STRENGTH = 0.018;
    const MAX_GLOW_DIST = 200;
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

      // vertical lines
      const startX = (offsetX % GRID_SPACING) - GRID_SPACING;
      for (let x = startX; x < width + GRID_SPACING; x += GRID_SPACING) {
        const dx = x - mx;
        const proximity = Math.max(0, 1 - Math.abs(dx) / MAX_GLOW_DIST);
        const alpha = 0.04 + proximity * 0.12;
        const r = Math.round(80 + proximity * 100);
        const g = Math.round(80 + proximity * 20);
        const b = Math.round(120 + proximity * 135);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // horizontal lines
      const startY = (offsetY % GRID_SPACING) - GRID_SPACING;
      for (let y = startY; y < height + GRID_SPACING; y += GRID_SPACING) {
        const dy = y - my;
        const proximity = Math.max(0, 1 - Math.abs(dy) / MAX_GLOW_DIST);
        const alpha = 0.04 + proximity * 0.12;
        const r = Math.round(80 + proximity * 100);
        const g = Math.round(80 + proximity * 20);
        const b = Math.round(120 + proximity * 135);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // radial glow under cursor
      if (mx > -9000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
        grd.addColorStop(0, "rgba(139,92,246,0.04)");
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
