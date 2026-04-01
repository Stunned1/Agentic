"use client";
import { useState } from "react";
import { Compass, Code2, Palette, Building2, User, Plus, Settings, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { label: "Explore", icon: Compass },
  { label: "Developer", icon: Code2 },
  { label: "Creative", icon: Palette },
  { label: "Enterprise", icon: Building2 },
  { label: "Personal", icon: User },
];

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ expanded, onToggle }: SidebarProps) {
  const [active, setActive] = useState("Explore");

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col py-6 px-3 z-10 transition-all duration-300 overflow-hidden"
      style={{ width: expanded ? "13rem" : "3.5rem" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-1 mb-8 min-w-0">
        <div className="w-7 h-7 shrink-0 rounded bg-purple-600 flex items-center justify-center text-xs font-bold">A</div>
        {expanded && (
          <div className="overflow-hidden">
            <div className="text-sm font-semibold leading-none whitespace-nowrap">Agentic</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest whitespace-nowrap">AI Agent Marketplace</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            title={!expanded ? label : undefined}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors text-left ${
              active === label
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={16} className="shrink-0" />
            {expanded && <span className="whitespace-nowrap">{label}</span>}
          </button>
        ))}
      </nav>

      {/* Create Agent */}
      <button
        title={!expanded ? "Create Agent" : undefined}
        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium px-2 py-2.5 rounded-lg mb-6"
      >
        <Plus size={16} className="shrink-0" />
        {expanded && <span className="whitespace-nowrap">Create Agent</span>}
      </button>

      {/* Bottom links */}
      <div className="flex flex-col gap-1">
        <button
          title={!expanded ? "Settings" : undefined}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs px-2 py-1.5 rounded transition-colors"
        >
          <Settings size={14} className="shrink-0" />
          {expanded && <span className="whitespace-nowrap">Settings</span>}
        </button>
        <button
          title={!expanded ? "Help" : undefined}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs px-2 py-1.5 rounded transition-colors"
        >
          <HelpCircle size={14} className="shrink-0" />
          {expanded && <span className="whitespace-nowrap">Help</span>}
        </button>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="mt-4 flex items-center justify-center w-full py-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
        title={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
}
