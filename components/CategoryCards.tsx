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
    <section className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:px-8 lg:grid-cols-3">
      {categories.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="cursor-pointer rounded-xl border border-white/8 bg-[#111118]/70 p-6 transition-colors hover:border-cyan-300/30"
        >
          <div className="mb-10 text-white/64">
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
          <p className="text-xs leading-relaxed text-white/45">{desc}</p>
        </div>
      ))}
    </section>
  );
}
