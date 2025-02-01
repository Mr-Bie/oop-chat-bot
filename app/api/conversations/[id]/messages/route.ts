import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: { conversationId: parseInt(id) },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const message = body.message;

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  await prisma.message.create({
    data: {
      role: "user",
      content: message,
      conversationId: parseInt(id),
    },
  });

  const botResponse = `You said: ${message}`;

  const botMessage = await prisma.message.create({
    data: {
      role: "bot",
      content: botResponse,
      conversationId: parseInt(id),
    },
  });

  return NextResponse.json(
    { reply: botMessage },
    {
      status: 201,
    }
  );
}
