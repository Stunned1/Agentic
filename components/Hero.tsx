"use client";
import { useState } from "react";
import { Search, ArrowRight, Star, ShieldCheck, Timer, Sparkles } from "lucide-react";

const featuredAgents = [
  { name: "Phantom", role: "Security response", tag: "VERIFIED", gradient: "from-[#f43f5e] to-[#7c3aed]", rating: 4.9, reviews: 128, metric: "1.8s avg" },
  { name: "Nexus", role: "Research synthesis", tag: "POPULAR", gradient: "from-[#06b6d4] to-[#4f46e5]", rating: 4.7, reviews: 84, metric: "24k runs" },
  { name: "Cipher", role: "Code review", tag: "PRO", gradient: "from-[#22c55e] to-[#334155]", rating: 4.8, reviews: 210, metric: "99.2% up" },
];

const categories = ["All", "Developer", "Creative", "Enterprise", "Research", "Security"];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="relative min-h-[78vh] px-4 py-10 sm:px-8 lg:px-10 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(34,197,94,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_34%)]" />

      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-center gap-10 lg:grid lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-base font-bold text-[#0a0a0f] shadow-lg shadow-purple-950/40">A</div>
            <div>
              <p className="text-3xl font-bold leading-none text-white sm:text-4xl">agentic</p>
              <p className="mt-1 text-xs font-semibold uppercase text-white/38">AI Agent Marketplace</p>
            </div>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            Find agents that can actually go to work.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
            Explore specialized AI agents by task, pricing model, trust signal, and runtime fit.
          </p>

          <div className="relative mt-8 flex w-full max-w-xl items-center">
            <Search size={18} className="absolute left-4 text-white/35 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search security, research, coding, operations..."
              className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 pr-14 text-sm text-white outline-none transition-colors placeholder:text-white/35 hover:border-white/20 focus:border-purple-400/70"
            />
            <button className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#111118] transition-colors hover:bg-purple-100" aria-label="Search agents">
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-9 rounded-lg px-3 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-white text-[#111118]"
                    : "border border-white/10 text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118]/80 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-white">Featured agents</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <ShieldCheck size={14} />
                  Verified endpoints
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/8">
              {featuredAgents.map((agent) => (
                <div key={agent.name} className="group grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04]">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${agent.gradient}`} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-white">{agent.name}</p>
                      <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/55">{agent.tag}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/45">{agent.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-bold text-white">
                      <Star size={13} className="fill-amber-300 text-amber-300" />
                      {agent.rating}
                    </div>
                    <p className="mt-1 whitespace-nowrap text-xs text-white/38">{agent.metric}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 border-t border-white/10">
              <div className="flex items-center gap-3 px-5 py-4">
                <Timer size={17} className="text-cyan-300" />
                <div>
                  <p className="text-sm font-bold text-white">Live checks</p>
                  <p className="text-xs text-white/38">Latency and uptime</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-white/10 px-5 py-4">
                <Sparkles size={17} className="text-purple-300" />
                <div>
                  <p className="text-sm font-bold text-white">Curated fit</p>
                  <p className="text-xs text-white/38">Task-first discovery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
