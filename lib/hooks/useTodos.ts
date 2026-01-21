"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type TodoData = {
  title: string;
  deskripsi: string;
  prioritas: string;
  tags: string[];
};

export const useTodos = (query: string, page: number) => {
  return useQuery({
    queryKey: ["todos", query, page],
    queryFn: async () => {
      const res = await fetch(`/api/todos?query=${query}&page=${page}`);
      if (!res.ok) throw new Error("Failed fetch");
      return res.json();
    },
    placeholderData: (previousData) => previousData,
  });
};

export const useTodosActions = () => {
  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: async (data: TodoData) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodo = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TodoData }) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal update task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal hapus task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return { createTodo, updateTodo, deleteTodo };
};
