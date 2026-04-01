"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton({ signOut }: { signOut?: boolean }) {
  const router = useRouter();

  async function handleClick() {
    if (signOut) {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/sign-in");
      router.refresh();
    } else {
      router.push("/profile");
    }
  }

  if (signOut) {
    return (
      <button
        onClick={handleClick}
        className="w-full bg-red-600/10 border border-red-500/20 hover:border-red-500/40 text-red-400 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-7 h-7 rounded-full bg-purple-600/60 border border-purple-500/40 hover:border-purple-400 transition-colors"
      title="Profile"
    />
  );
}
