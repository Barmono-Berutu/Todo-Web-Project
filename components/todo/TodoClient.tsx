"use client";
import { useSearchParams } from "next/navigation";
import { useTodos } from "@/lib/hooks/useTodos";
import TodoTable from "./TodoTable";
import { PaginationComponents } from "@/components/Pagination";

export default function TodoClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const { data, isLoading } = useTodos(query, page);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <TodoTable data={data.data} />
      <PaginationComponents totalPages={data.totalPages} />
    </div>
  );
}
