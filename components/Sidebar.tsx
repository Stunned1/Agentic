"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Palette, Building2, User, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { label: "Explore",    icon: Compass,   href: "/" },
  { label: "Creative",   icon: Palette,   href: "/creative" },
  { label: "Enterprise", icon: Building2, href: "/enterprise" },
  { label: "Personal",   icon: User,      href: "/personal" },
];

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
  profile?: React.ReactNode;
}

export default function Sidebar({ expanded, onToggle, profile }: SidebarProps) {
  const pathname = usePathname();

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
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              title={!expanded ? label : undefined}
              className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {expanded && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="flex flex-col gap-1">
        <button
          title={!expanded ? "Help" : undefined}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs px-2 py-1.5 rounded transition-colors"
        >
          <HelpCircle size={14} className="shrink-0" />
          {expanded && <span className="whitespace-nowrap">Help</span>}
        </button>
        {profile && <div className="mt-1 border-t border-white/5 pt-2">{profile}</div>}
      </div>

      {/* Toggle */}
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
