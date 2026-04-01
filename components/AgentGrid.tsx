const agents = [
  { id: 1, name: "Phantom", tag: "ELITE", gradient: "from-pink-900 to-purple-900" },
  { id: 2, name: "Nexus", tag: "PRO", gradient: "from-purple-900 to-indigo-900" },
  { id: 3, name: "Cipher", tag: "ELITE", gradient: "from-indigo-900 to-slate-900" },
];

export default function AgentGrid() {
  return (
    <section className="grid grid-cols-3 gap-4 px-8 max-w-4xl mx-auto">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="bg-[#111118] border border-white/5 rounded-xl overflow-hidden hover:border-purple-500/30 transition-colors cursor-pointer group"
        >
          <div className={`h-40 bg-gradient-to-br ${agent.gradient} relative`}>
            <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/10 border border-white/20 px-2 py-0.5 rounded text-white/80 tracking-widest">
              {agent.tag}
            </span>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-sm">{agent.name}</h4>
            <p className="text-white/40 text-xs mt-1">Autonomous AI Agent</p>
          </div>
        </div>
      ))}
    </section>
  );
}
