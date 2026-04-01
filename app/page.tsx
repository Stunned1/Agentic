import SidebarLayout from "@/components/SidebarLayout";
import SidebarProfile from "@/components/SidebarProfile";
import Hero from "@/components/Hero";
import TrendingAgents from "@/components/TrendingAgents";
import CategoryCards from "@/components/CategoryCards";
import AgentFilters from "@/components/AgentFilters";
import AgentGrid from "@/components/AgentGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SidebarLayout profile={<SidebarProfile />}>
        <main className="pb-16">
          <Hero />
          <TrendingAgents />
          <CategoryCards />
          <AgentFilters />
          <AgentGrid />
        </main>
      </SidebarLayout>
    </div>
  );
}
