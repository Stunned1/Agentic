"use client";
import { useState } from "react";

const filters = ["All Agents", "Visionary", "Technical", "Strategic", "Linguistic"];

export default function AgentFilters() {
  const [active, setActive] = useState("All Agents");

  return (
    <div className="flex items-center justify-between px-8 max-w-4xl mx-auto mb-6">
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              active === f
                ? "bg-purple-600 text-white"
                : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-white/40 text-sm">
        Sort by:
        <select className="bg-transparent border border-white/10 rounded px-2 py-1 text-white/60 text-sm">
          <option>Newest First</option>
          <option>Most Popular</option>
          <option>Top Rated</option>
        </select>
      </div>
    </div>
  );
}
