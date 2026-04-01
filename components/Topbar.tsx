import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

const navLinks = ["Explore", "Agents", "My Studio", "Pricing"];

export default async function Topbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 h-14 bg-[#0f0f17]/90 backdrop-blur border-b border-white/5 flex items-center justify-between px-8 z-10 rounded-t-xl">
      <div />
      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <a key={link} href="#" className={`text-sm transition-colors ${link === "Explore" ? "text-white border-b border-purple-500 pb-0.5" : "text-white/50 hover:text-white"}`}>
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button className="text-white/50 hover:text-white transition-colors">
              <Bell size={18} />
            </button>
            <SignOutButton />
          </>
        ) : (
          <Link href="/sign-in" className="text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-lg transition-colors">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
