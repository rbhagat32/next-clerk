import { prisma } from "@/lib/prisma";
import { WebhookEvent } from "@clerk/backend";
import { verifyWebhook } from "@clerk/backend/webhooks";

export async function POST(request: Request) {
  try {
    const evt = await verifyWebhook(request);
    const event = evt as WebhookEvent;

    const eventType = event.type;

    if (eventType === "user.created") {
      console.log("WEBHOOK -> New user created:", event.data.id);

      const name =
        event.data.first_name && event.data.last_name
          ? `${event.data.first_name} ${event.data.last_name}`
          : event.data.first_name || event.data.last_name || "Unnamed User";

      const email = event.data.email_addresses?.[0]?.email_address || "";
      const avatar = event.data.image_url || null;

      await prisma.user.create({
        data: {
          clerkId: event.data.id,
          name,
          email,
          avatar,
        },
      });

      console.log("WEBHOOK -> User stored in DB:", email);
    } else if (eventType === "user.updated") {
      const name =
        event.data.first_name && event.data.last_name
          ? `${event.data.first_name} ${event.data.last_name}`
          : event.data.first_name || event.data.last_name || "Unnamed User";

      const email = event.data.email_addresses?.[0]?.email_address || "";
      const avatar = event.data.image_url || null;

      await prisma.user.update({
        where: { clerkId: event.data.id },
        data: { name, email, avatar },
      });

      console.log("WEBHOOK -> User updated in DB:", email);
    } else if (eventType === "user.deleted") {
      await prisma.user.delete({
        where: { clerkId: event.data.id },
      });

      console.log("WEBHOOK -> User deleted in DB:", event.data.id);
    }

    return new Response("Success", { status: 200 });
  } catch (err: any) {
    console.error("❌ Webhook verification or handling failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
