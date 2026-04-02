import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// PATCH /api/agents/[id] — update a pending agent (developer only, before approval)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership and that it's still editable
  const { data: existing } = await supabase
    .from("agents")
    .select("developer_id, status")
    .eq("id", id)
    .single();

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.developer_id !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (existing.status === "approved") return NextResponse.json({ error: "Approved agents cannot be edited" }, { status: 409 });

  const body = await req.json();
  const { storefront, technical, pricing } = body;

  if (storefront) {
    await supabase.from("agents").update({
      name: storefront.name,
      tagline: storefront.tagline,
      description: storefront.description,
      category: storefront.category,
      tags: storefront.tags,
      required_inputs: storefront.required_inputs,
      demo_url: storefront.demo_url,
      status: "pending", // re-queue for review on edit
    }).eq("id", id);
  }

  if (technical) {
    await supabase.from("agent_endpoints").upsert({
      agent_id: id,
      endpoint_url: technical.endpoint_url,
      auth_token: technical.auth_token,
      custom_headers: technical.custom_headers ?? {},
      webhook_url: technical.webhook_url ?? null,
      avg_run_time: technical.avg_run_time,
    });
  }

  if (pricing) {
    await supabase.from("agent_pricing").upsert({
      agent_id: id,
      model: pricing.model,
      price_usd: pricing.price_usd ?? null,
      credits_per_run: pricing.credits_per_run ?? null,
    });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/agents/[id] — remove a listing
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("agents")
    .select("developer_id")
    .eq("id", id)
    .single();

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.developer_id !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await supabase.from("agents").delete().eq("id", id);

  return NextResponse.json({ success: true });
}
