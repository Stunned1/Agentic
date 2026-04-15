const agents = [
  { id: 1, name: "Phantom", tag: "ELITE", gradient: "from-pink-900 to-purple-900" },
  { id: 2, name: "Nexus", tag: "PRO", gradient: "from-purple-900 to-indigo-900" },
  { id: 3, name: "Cipher", tag: "ELITE", gradient: "from-indigo-900 to-slate-900" },
];

export default function AgentGrid() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="group cursor-pointer overflow-hidden rounded-xl border border-white/8 bg-[#111118]/70 transition-colors hover:border-cyan-300/30"
        >
          <div className={`h-40 bg-gradient-to-br ${agent.gradient} relative`}>
            <span className="absolute right-3 top-3 rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/80">
              {agent.tag}
            </span>
          </div>
          <div className="p-4">
            <h4 className="text-sm font-bold text-white">{agent.name}</h4>
            <p className="mt-1 text-xs text-white/42">Autonomous AI Agent</p>
          </div>
        </div>
      ))}
    </section>
  );
}
