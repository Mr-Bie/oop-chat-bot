import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(conversations);
}

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newConversation = await prisma.conversation.create({
    data: { userId: session.user.id },
  });

  return NextResponse.json(newConversation, { status: 201 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const title = body.title;

  const updatedConversation = await prisma.conversation.update({
    where: { id: Number(id), userId: session.user.id },
    data: {
      title,
    },
  });

  return NextResponse.json(updatedConversation, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversationId = Number(id);
  const userId = session.user.id;

  await prisma.message.deleteMany({
    where: {
      conversation: { AND: { id: conversationId, userId: userId } },
    },
  });

  const updatedConversation = await prisma.conversation.delete({
    where: { id: Number(id), userId: session.user.id },
  });

  return NextResponse.json(updatedConversation, { status: 200 });
}
