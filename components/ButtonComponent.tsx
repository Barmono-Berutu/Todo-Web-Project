"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import clsx from "clsx";
import { IoTrashOutline, IoPencil } from "react-icons/io5";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useTodoStore } from "@/lib/store/todoStore";
import { useTodosActions } from "@/lib/hooks/useTodos";

type DetailsButtonProps = {
  todo: {
    id: string;
    title: string;
    deskripsi: string;
    prioritas: string;
    tags: string[];
    isDone: boolean;
    createdAt: string;
  };
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full font-medium py-2.5 px-6 ",
        pending && "opacity-50 cursor-progress",
      )}
    >
      {pending ? `${label}...` : label}
    </Button>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/todos/edit/${id}`}>
      <Button size="icon" variant="secondary" className="hover:bg-gray-200">
        <IoPencil size={4} />
      </Button>
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const { deleteTodo } = useTodosActions();

  const handleDelete = async () => {
    await deleteTodo.mutateAsync(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <IoTrashOutline size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Task?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus task ini? Tindakan ini tidak bisa
            dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Ya, Hapus Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export function DetailsButton({ todo }: DetailsButtonProps) {
  const router = useRouter();
  const { setSelectedTodo } = useTodoStore();

  const handleClick = () => {
    setSelectedTodo(todo);
    router.push(`/todos/details/${todo.id}`);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      title="Lihat detail"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}

export const BackButton = () => {
  return (
    <Link href={"/todos"}>
      <Button className="gap-2" variant="ghost">
        <ArrowLeft size={4} />
        Kembali
      </Button>
    </Link>
  );
};

export const AuthButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? `${label}...` : label}
    </Button>
  );
};
