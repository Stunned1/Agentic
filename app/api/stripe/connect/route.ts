import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });

// POST /api/stripe/connect — create a Stripe Connect account and return onboarding URL
export async function POST() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if they already have a Stripe account
  const { data: devProfile } = await supabase
    .from("developer_profiles")
    .select("stripe_account_id, stripe_onboarded")
    .eq("id", user.id)
    .single();

  let accountId = devProfile?.stripe_account_id;

  if (!accountId) {
    // Create a new Express account
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      capabilities: { transfers: { requested: true } },
    });
    accountId = account.id;

    // Upsert developer profile with the new account ID
    await supabase.from("developer_profiles").upsert({
      id: user.id,
      stripe_account_id: accountId,
      stripe_onboarded: false,
    });
  }

  if (devProfile?.stripe_onboarded) {
    return NextResponse.json({ already_onboarded: true });
  }

  // Generate onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/developer/stripe/refresh`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/developer/stripe/return`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}
