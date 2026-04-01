import { ShieldCheck, BarChart3, PenLine } from "lucide-react";
import { LucideIcon } from "lucide-react";

const categories: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Autonomous threat detection and real-time defensive protocols.",
  },
  {
    icon: BarChart3,
    title: "Research & Analysis",
    desc: "Synthesize complex data sets into actionable high-level strategies.",
  },
  {
    icon: PenLine,
    title: "Creative Writing",
    desc: "Narrative intelligence capable of mimicking specific brand voices.",
  },
];

export default function CategoryCards() {
  return (
    <section className="grid grid-cols-3 gap-4 px-8 max-w-4xl mx-auto mb-12">
      {categories.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="bg-[#111118] border border-white/5 rounded-xl p-6 hover:border-purple-500/30 transition-colors cursor-pointer"
        >
          <div className="mb-12 text-white/60">
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
        </div>
      ))}
    </section>
  );
}
