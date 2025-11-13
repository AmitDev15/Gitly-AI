import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { db } from "~/server/db";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 },
    );
  }
  const session = event.data.object as Stripe.Checkout.Session;
  console.log("Received Stripe webhook event:", event.type);
  if (event.type === "checkout.session.completed") {
    const credits = Number(session.metadata?.["credits"] || 0);
    const userId = session.client_reference_id;
    if (!userId || !credits) {
      return NextResponse.json(
        { error: "Missing user ID or credits" },
        { status: 400 },
      );
    }
    await db.stripeTransaction.create({
      data: {
        userId,
        credits,
      },
    });
    await db.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credits,
        },
      },
    });
    return NextResponse.json(
      { message: "Credits added successfully." },
      { status: 200 },
    );
  }
  return NextResponse.json({ message: "Webhook received successfully." });
}
