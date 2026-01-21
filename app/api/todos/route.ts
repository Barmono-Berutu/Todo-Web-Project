// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { todoSchema } from "@/lib/zod";

const ITEMS_PER_PAGE = 10;

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { data: [], totalPages: 0, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") ?? "";
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);

    const todos = await prisma.todo.findMany({
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        userId: session.user.id,
        title: { contains: query, mode: "insensitive" },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.todo.count({
      where: {
        userId: session.user.id,
        title: { contains: query, mode: "insensitive" },
      },
    });

    return NextResponse.json({
      data: todos,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    });
  } catch (error) {
    console.error("GET todos error:", error);
    return NextResponse.json(
      { data: [], totalPages: 0, message: "Failed to fetch todos" },
      { status: 500 },
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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

    const todo = await prisma.todo.create({
      data: {
        title,
        deskripsi,
        prioritas,
        tags: tags || [],
        userId: session.user.id,
      },
    });

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("POST todos error:", error);
    return NextResponse.json(
      { message: "Failed to create todo" },
      { status: 500 },
    );
  }
}
