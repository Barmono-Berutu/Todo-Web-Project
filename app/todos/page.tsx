import SearchComponent from "@/components/SearchComponent";
import TodoClient from "@/components/todo/TodoClient";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function TaskPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600">Daftar list kamu bisa lihat disini</p>
      </header>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <SearchComponent />

        <Link href="/todos/create" className="ml-auto">
          <Button className="flex items-center gap-2 px-4 py-2">
            <PlusIcon className="h-5 w-5" />
            Tambah Task
          </Button>
        </Link>
      </div>

      <section className="w-full">
        <TodoClient />
      </section>
    </main>
  );
}
