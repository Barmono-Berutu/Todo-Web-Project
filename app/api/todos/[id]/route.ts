import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { todoSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo || todo.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Todo tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("GET todo error:", error);
    return NextResponse.json(
      { message: "Failed to fetch todo" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const parsed = todoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { title, deskripsi, prioritas, tags } = parsed.data;

    const updated = await prisma.todo.updateMany({
      where: { id, userId: session.user.id },
      data: { title, deskripsi, prioritas, tags: tags || [] },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { message: "Todo tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Todo updated" });
  } catch (error) {
    console.error("PUT todo error:", error);
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const deleted = await prisma.todo.deleteMany({
      where: { id, userId: session.user.id },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "Todo tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("DELETE todo error:", error);
    return NextResponse.json(
      { message: "Failed to delete todo" },
      { status: 500 },
    );
  }
}
