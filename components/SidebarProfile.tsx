import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function SidebarProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center gap-3 px-2 py-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors text-sm"
      >
        <div className="w-7 h-7 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-[10px]">?</div>
        <span className="whitespace-nowrap text-xs">Sign in</span>
      </Link>
    );
  }

  const initials = (user.email ?? "U").slice(0, 1).toUpperCase();

  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <div className="w-7 h-7 shrink-0 rounded-full bg-purple-600/70 border border-purple-500/40 flex items-center justify-center text-xs font-semibold text-white">
        {initials}
      </div>
      <div className="overflow-hidden">
        <p className="text-xs font-medium text-white truncate leading-none">{user.email}</p>
        <p className="text-[10px] text-white/30 mt-0.5">View profile</p>
      </div>
    </Link>
  );
}
