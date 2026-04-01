"use client";
import { useState } from "react";
import { Compass, Code2, Palette, Building2, User, Plus, Settings, HelpCircle } from "lucide-react";

const navItems = [
  { label: "Explore", icon: Compass },
  { label: "Developer", icon: Code2 },
  { label: "Creative", icon: Palette },
  { label: "Enterprise", icon: Building2 },
  { label: "Personal", icon: User },
];

export default function Sidebar() {
  const [active, setActive] = useState("Explore");

  return (
    <aside className="fixed left-0 top-0 h-full w-52 bg-[#0d0d14] border-r border-white/5 flex flex-col py-6 px-3 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-7 h-7 rounded bg-purple-600 flex items-center justify-center text-xs font-bold">A</div>
        <div>
          <div className="text-sm font-semibold leading-none">Agentic</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest">AI Agent Marketplace</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
              active === label
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Create Agent */}
      <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-lg mb-6">
        <Plus size={16} /> Create Agent
      </button>

      {/* Bottom links */}
      <div className="flex flex-col gap-1">
        <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs px-3 py-1.5 rounded transition-colors">
          <Settings size={14} /> Settings
        </button>
        <button className="flex items-center gap-2 text-white/40 hover:text-white text-xs px-3 py-1.5 rounded transition-colors">
          <HelpCircle size={14} /> Help
        </button>
      </div>
    </aside>
  );
}
