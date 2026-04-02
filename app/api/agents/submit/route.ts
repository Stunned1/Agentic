import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { storefront, technical, pricing } = body;

  // Validate required fields
  if (!storefront?.name || !storefront?.description || !technical?.endpoint_url || !technical?.auth_token || !pricing?.model) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Ensure developer has connected Stripe before listing
  const { data: devProfile } = await supabase
    .from("developer_profiles")
    .select("stripe_onboarded")
    .eq("id", user.id)
    .single();

  if (!devProfile?.stripe_onboarded) {
    return NextResponse.json({ error: "Stripe account not connected" }, { status: 403 });
  }

  // Insert agent listing
  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .insert({
      developer_id: user.id,
      name: storefront.name,
      tagline: storefront.tagline,
      description: storefront.description,
      category: storefront.category,
      tags: storefront.tags ?? [],
      required_inputs: storefront.required_inputs,
      demo_url: storefront.demo_url,
      status: "pending",
    })
    .select("id")
    .single();

  if (agentError || !agent) {
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }

  // Insert technical config
  const { error: endpointError } = await supabase
    .from("agent_endpoints")
    .insert({
      agent_id: agent.id,
      endpoint_url: technical.endpoint_url,
      auth_token: technical.auth_token,       // TODO: encrypt before storing
      custom_headers: technical.custom_headers ?? {},
      webhook_url: technical.webhook_url ?? null,
      avg_run_time: technical.avg_run_time,
    });

  if (endpointError) {
    // Roll back agent row
    await supabase.from("agents").delete().eq("id", agent.id);
    return NextResponse.json({ error: "Failed to save endpoint config" }, { status: 500 });
  }

  // Insert pricing
  const { error: pricingError } = await supabase
    .from("agent_pricing")
    .insert({
      agent_id: agent.id,
      model: pricing.model,
      price_usd: pricing.price_usd ?? null,
      credits_per_run: pricing.credits_per_run ?? null,
    });

  if (pricingError) {
    await supabase.from("agents").delete().eq("id", agent.id);
    return NextResponse.json({ error: "Failed to save pricing" }, { status: 500 });
  }

  return NextResponse.json({ agent_id: agent.id, status: "pending" }, { status: 201 });
}
