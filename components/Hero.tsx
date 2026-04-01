export default function Hero() {
  return (
    <section className="text-center py-20 px-8 max-w-2xl mx-auto">
      <div className="inline-block border border-white/20 rounded-full px-4 py-1 text-xs text-white/60 uppercase tracking-widest mb-6">
        The Future of Intelligence
      </div>
      <h1 className="text-5xl font-bold leading-tight mb-4">
        The Next Evolution<br />
        of <span className="text-purple-500">Agency.</span>
      </h1>
      <p className="text-white/50 text-base mb-8 leading-relaxed">
        Deploy specialized neural agents curated for extreme precision.<br />
        The world&apos;s most advanced autonomous labor marketplace.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium px-6 py-3 rounded-lg text-sm">
          Browse Ecosystem
        </button>
        <button className="border border-white/20 hover:border-white/40 transition-colors text-white font-medium px-6 py-3 rounded-lg text-sm">
          Integration Docs
        </button>
      </div>
    </section>
  );
}
