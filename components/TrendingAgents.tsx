"use client";
import { useState } from "react";
import { TrendingUp, Star, Zap, ArrowRight } from "lucide-react";

const tabs = ["Trending", "Top Rated", "New Arrivals"];

const agents = [
  { id: 1,  name: "Phantom",   category: "Security",   price: 49,  rating: 4.9, reviews: 128, tag: "ELITE",  gradient: "from-pink-900 to-purple-900",   trend: "+24%" },
  { id: 2,  name: "Nexus",     category: "Research",   price: 39,  rating: 4.7, reviews: 84,  tag: "PRO",    gradient: "from-purple-900 to-indigo-900",  trend: "+18%" },
  { id: 3,  name: "Cipher",    category: "Developer",  price: 59,  rating: 4.8, reviews: 210, tag: "ELITE",  gradient: "from-indigo-900 to-slate-900",   trend: "+31%" },
  { id: 4,  name: "Orion",     category: "Enterprise", price: 89,  rating: 4.6, reviews: 57,  tag: "PRO",    gradient: "from-violet-900 to-purple-900",  trend: "+12%" },
  { id: 5,  name: "Lyra",      category: "Creative",   price: 29,  rating: 5.0, reviews: 99,  tag: "ELITE",  gradient: "from-fuchsia-900 to-pink-900",   trend: "+41%" },
  { id: 6,  name: "Vex",       category: "Developer",  price: 19,  rating: 4.5, reviews: 33,  tag: "NEW",    gradient: "from-slate-800 to-indigo-900",   trend: "+9%"  },
  { id: 7,  name: "Atlas",     category: "Enterprise", price: 99,  rating: 4.8, reviews: 176, tag: "PRO",    gradient: "from-blue-900 to-indigo-900",    trend: "+22%" },
  { id: 8,  name: "Solace",    category: "Creative",   price: 34,  rating: 4.7, reviews: 61,  tag: "NEW",    gradient: "from-rose-900 to-fuchsia-900",   trend: "+15%" },
];

export default function TrendingAgents() {
  const [activeTab, setActiveTab] = useState("Trending");

  return (
    <section className="mx-auto mb-16 max-w-6xl px-4 sm:px-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-cyan-300" />
          <h2 className="text-lg font-bold text-white">Trending Now</h2>
        </div>

        {/* Tabs */}
        <div className="flex w-fit items-center gap-1 rounded-lg border border-white/8 bg-white/[0.04] p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
                activeTab === tab
                  ? "bg-white text-[#111118]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-white/8 bg-[#111118]/86 transition-all hover:-translate-y-0.5 hover:border-cyan-300/30"
          >
            {/* Gradient banner */}
            <div className={`h-28 bg-gradient-to-br ${agent.gradient} relative`}>
              <span className="absolute left-2 top-2 rounded-md border border-white/20 bg-black/30 px-1.5 py-0.5 text-[9px] font-bold text-white/80">
                {agent.tag}
              </span>
              <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-md bg-black/30 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                <Zap size={9} className="fill-emerald-400" />
                {agent.trend}
              </span>
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="mb-1 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                  <p className="text-[11px] text-white/40">{agent.category}</p>
                </div>
                <span className="whitespace-nowrap text-sm font-bold text-white">${agent.price}<span className="text-[10px] font-semibold text-white/30">/mo</span></span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-[11px] text-white/50">{agent.rating} <span className="text-white/25">({agent.reviews})</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all */}
      <button className="mx-auto mt-5 flex items-center gap-1.5 text-sm font-bold text-white/42 transition-colors hover:text-cyan-300">
        View all trending agents <ArrowRight size={14} />
      </button>
    </section>
  );
}
