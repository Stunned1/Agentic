import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import AgentFilters from "@/components/AgentFilters";
import AgentGrid from "@/components/AgentGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <Topbar />
      <main className="ml-52 pt-14 pb-16">
        <Hero />
        <CategoryCards />
        <AgentFilters />
        <AgentGrid />
      </main>
    </div>
  );
}
