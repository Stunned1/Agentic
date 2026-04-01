"use client";
import { useState } from "react";
import { Search, ArrowRight, Star } from "lucide-react";

const floatingCards = [
  { name: "Phantom", tag: "ELITE", gradient: "from-pink-900 to-purple-900",   rating: 4.9, reviews: 128, style: "top-[8%]  left-[4%]  rotate-[-6deg]" },
  { name: "Nexus",   tag: "PRO",   gradient: "from-purple-900 to-indigo-900", rating: 4.7, reviews: 84,  style: "top-[5%]  left-[22%] rotate-[3deg]" },
  { name: "Cipher",  tag: "ELITE", gradient: "from-indigo-900 to-slate-900",  rating: 4.8, reviews: 210, style: "top-[10%] right-[22%] rotate-[-3deg]" },
  { name: "Orion",   tag: "PRO",   gradient: "from-violet-900 to-purple-900", rating: 4.6, reviews: 57,  style: "top-[6%]  right-[4%]  rotate-[5deg]" },
  { name: "Vex",     tag: "NEW",   gradient: "from-slate-800 to-indigo-900",  rating: 4.5, reviews: 33,  style: "bottom-[18%] left-[6%]  rotate-[4deg]" },
  { name: "Lyra",    tag: "ELITE", gradient: "from-fuchsia-900 to-pink-900",  rating: 5.0, reviews: 99,  style: "bottom-[14%] right-[5%] rotate-[-5deg]" },
];

const categories = ["All", "Developer", "Creative", "Enterprise", "Research", "Security"];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[88vh] px-8 overflow-hidden select-none">
      {floatingCards.map((card) => (
        <div
          key={card.name}
          className={`absolute w-36 rounded-xl overflow-hidden border border-white/10 shadow-2xl pointer-events-none ${card.style}`}
        >
          <div className={`h-24 bg-gradient-to-br ${card.gradient} relative`}>
            <span className="absolute top-2 right-2 text-[9px] font-bold bg-black/30 border border-white/20 px-1.5 py-0.5 rounded tracking-widest text-white/80">
              {card.tag}
            </span>
          </div>
          <div className="bg-[#111118] px-3 py-2">
            <p className="text-xs font-semibold text-white">{card.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] text-white/50">{card.rating} ({card.reviews})</span>
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-purple-900/50">A</div>
          <span className="text-3xl font-bold tracking-tight">agentic</span>
        </div>

        <div className="relative w-full flex items-center">
          <Search size={17} className="absolute left-4 text-white/30 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What kind of agent are you looking for?"
            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:outline-none transition-colors rounded-2xl pl-11 pr-14 py-4 text-sm text-white placeholder-white/30"
          />
          <button className="absolute right-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-xl p-2.5">
            <ArrowRight size={16} className="text-white" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
