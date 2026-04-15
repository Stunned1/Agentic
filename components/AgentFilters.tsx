"use client";
import { useState } from "react";

const filters = ["All Agents", "Visionary", "Technical", "Strategic", "Linguistic"];

export default function AgentFilters() {
  const [active, setActive] = useState("All Agents");

  return (
    <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-4 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-lg font-bold text-white">Explore agents</h2>
        <p className="mt-1 text-sm text-white/42">Browse the current marketplace preview.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`h-9 rounded-lg px-3 text-sm font-bold transition-colors ${
              active === f
                ? "bg-white text-[#111118]"
                : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
            }`}
          >
            {f}
          </button>
        ))}
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-white/42">
          Sort
          <select className="h-9 rounded-lg border border-white/10 bg-[#111118] px-3 text-sm font-bold text-white/70 outline-none transition-colors hover:border-white/25">
            <option>Newest First</option>
            <option>Most Popular</option>
            <option>Top Rated</option>
          </select>
        </label>
      </div>
    </div>
  );
}
