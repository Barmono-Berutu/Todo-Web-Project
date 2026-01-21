"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TodoForm from "@/components/TodoForm";
import { useTodosActions } from "@/lib/hooks/useTodos";

type TodoProps = {
  title: string;
  deskripsi: string;
  prioritas: "rendah" | "menengah" | "tinggi";
  tags: string[];
};

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { updateTodo } = useTodosActions();

  const [todo, setTodo] = useState<TodoProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTodo = async () => {
      try {
        const res = await fetch(`/api/todos/${id}`);
        if (!res.ok) throw new Error("Todo tidak ditemukan");
        const data = await res.json();
        setTodo({
          title: data.title,
          deskripsi: data.deskripsi,
          prioritas: data.prioritas,
          tags: data.tags ?? [],
        });
      } catch (err) {
        console.error(err);
        setTodo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    if (!id) return;

    const idString = Array.isArray(id) ? id[0] : id;
    const rawData = Object.fromEntries(formData.entries());

    const tagsString = rawData.tags;
    let tags: string[] = [];

    if (typeof tagsString === "string" && tagsString.trim() !== "") {
      try {
        tags = JSON.parse(tagsString);
        if (!Array.isArray(tags)) tags = [];
      } catch {
        tags = [];
      }
    }

    const data = {
      title: rawData.title as string,
      deskripsi: rawData.deskripsi as string,
      prioritas: rawData.prioritas as string,
      tags,
    };

    try {
      await updateTodo.mutateAsync({ id: idString, data });
      router.push("/");
    } catch (error: any) {
      return { error: { form: [error.message] } };
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!todo) return <div>Todo tidak ditemukan</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5">Edit Task</h1>
        <TodoForm
          defaultValues={todo}
          onSubmit={handleSubmit}
          submitLabel="Update"
        />
      </div>
    </div>
  );
}
