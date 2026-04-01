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
    <section className="px-8 max-w-5xl mx-auto mb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-purple-400" />
          <h2 className="text-base font-semibold text-white">Trending Now</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#111118] border border-white/5 rounded-xl overflow-hidden hover:border-purple-500/30 hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            {/* Gradient banner */}
            <div className={`h-28 bg-gradient-to-br ${agent.gradient} relative`}>
              <span className="absolute top-2 left-2 text-[9px] font-bold bg-black/30 border border-white/20 px-1.5 py-0.5 rounded tracking-widest text-white/80">
                {agent.tag}
              </span>
              <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400 bg-black/30 px-1.5 py-0.5 rounded">
                <Zap size={9} className="fill-emerald-400" />
                {agent.trend}
              </span>
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
                  <p className="text-[11px] text-white/40">{agent.category}</p>
                </div>
                <span className="text-sm font-bold text-purple-400">${agent.price}<span className="text-[10px] text-white/30 font-normal">/mo</span></span>
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
      <button className="mt-5 flex items-center gap-1.5 text-sm text-white/40 hover:text-purple-400 transition-colors mx-auto">
        View all trending agents <ArrowRight size={14} />
      </button>
    </section>
  );
}
