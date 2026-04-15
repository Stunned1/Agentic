import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import SidebarLayout from "@/components/SidebarLayout";
import SidebarProfile from "@/components/SidebarProfile";
import AvatarUpload from "@/components/AvatarUpload";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).single();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SidebarLayout profile={<SidebarProfile />}>
      <div className="max-w-2xl mx-auto px-8 py-12">
        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-10">
          <AvatarUpload initial={profile?.avatar_url} fallback={user.email?.[0].toUpperCase() ?? "U"} />
          <div>
            <h1 className="text-xl font-semibold">{user.email}</h1>
            <p className="text-white/40 text-sm">Member since {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Agents Deployed", value: "0" },
            { label: "Active Sessions", value: "0" },
            { label: "Total Runs", value: "0" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#111118] border border-white/5 rounded-xl p-5">
              <div className="text-2xl font-bold mb-1">{value}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* Account info */}
        <div className="bg-[#111118] border border-white/5 rounded-xl p-6 mb-4">
          <h2 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-widest">Account</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Email</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">User ID</span>
              <span className="text-white/60 font-mono text-xs">{user.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Last sign in</span>
              <span>{new Date(user.last_sign_in_at ?? "").toLocaleString()}</span>
            </div>
          </div>
        </div>

        <SignOutButton signOut />
      </div>
      </SidebarLayout>
    </div>
  );
}
