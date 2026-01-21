"use client";

import { useTodoStore } from "@/lib/store/todoStore";
import { BackButton } from "@/components/ButtonComponent";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Edit,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function getPriorityColor(prioritas: string) {
  switch (prioritas) {
    case "tinggi":
      return "destructive";
    case "menengah":
      return "default";
    default:
      return "secondary";
  }
}

function getPriorityIcon(prioritas: string) {
  switch (prioritas) {
    case "tinggi":
      return <AlertCircle size={16} className="text-red-600" />;
    case "menengah":
      return <AlertCircle size={16} className="text-yellow-500" />;
    default:
      return <AlertCircle size={16} className="text-green-600" />;
  }
}

export default function DetailsPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedTodo, findTodoById } = useTodoStore();
  const [todo, setTodo] = useState(selectedTodo);

  useEffect(() => {
    if (!selectedTodo && id) {
      const foundTodo = findTodoById(id as string);
      if (foundTodo) {
        setTodo(foundTodo);
      } else {
        router.push("/");
      }
    }
  }, [selectedTodo, id, findTodoById, router]);

  if (!todo) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Todo tidak ditemukan</h2>
            <p className="text-gray-500 mb-4">
              Todo yang Anda cari tidak ditemukan atau telah dihapus.
            </p>
            <BackButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center p-6">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <BackButton />
          <div className="flex gap-2">
            <Link href={`/edit/${todo.id}`}>
              <Button className="gap-2">
                <Edit size={16} />
                Edit todo
              </Button>
            </Link>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {todo.isDone ? (
                    <CheckCircle2 size={24} className="text-green-600" />
                  ) : (
                    <Circle size={24} className="text-gray-400" />
                  )}
                  <CardTitle className="text-3xl">{todo.title}</CardTitle>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  {todo.isDone && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Selesai
                    </Badge>
                  )}
                  <Badge
                    variant={getPriorityColor(todo.prioritas)}
                    className="text-sm"
                  >
                    {getPriorityIcon(todo.prioritas)}
                    <span className="ml-1">
                      {todo.prioritas.charAt(0).toUpperCase() +
                        todo.prioritas.slice(1)}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                Deskripsi
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-base leading-relaxed">{todo.deskripsi}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span className="font-medium">Tanggal Dibuat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-base">
                    {new Date(todo.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag size={16} />
                  <span className="font-medium">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  {todo.isDone ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle2 size={14} className="mr-1" />
                      Selesai
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-amber-600 border-amber-300"
                    >
                      <Clock size={14} className="mr-1" />
                      Dalam Progress
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {todo.tags && todo.tags.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag size={16} />
                    <span className="font-medium">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {todo.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Status todo
                </p>
                <p className="text-lg font-semibold">
                  {todo.isDone ? "Selesai ✓" : "Dalam Progress"}
                </p>
              </div>
              <div className="flex gap-2">
                {!todo.isDone && <Button>Tandai Selesai</Button>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
