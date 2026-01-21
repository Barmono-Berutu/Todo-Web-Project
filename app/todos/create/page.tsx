"use client";

import React from "react";
import TodoForm from "@/components/TodoForm";
import { useTodosActions } from "@/lib/hooks/useTodos";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const { createTodo } = useTodosActions();
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      title: rawData.title as string,
      deskripsi: rawData.deskripsi as string,
      prioritas: rawData.prioritas as string,
      tags: rawData.tags ? JSON.parse(rawData.tags as string) : [],
    };

    try {
      await createTodo.mutateAsync(data);
      router.push("/");
    } catch (error: any) {
      return { error: { form: [error.message] } };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5">Tambah Task Baru</h1>
        <TodoForm onSubmit={handleSubmit} submitLabel="Tambah" />
      </div>
    </div>
  );
}
