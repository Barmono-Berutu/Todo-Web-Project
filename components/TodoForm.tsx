"use client";
import React, { useActionState, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { SubmitButton } from "./ButtonComponent";

const PRIORITAS = ["rendah", "menengah", "tinggi"] as const;

type TodoFormProps = {
  defaultValues?: {
    title: string;
    deskripsi: string;
    prioritas: (typeof PRIORITAS)[number];
    tags: string[];
  };

  onSubmit: (prevState: any, formData: FormData) => Promise<any>;
  submitLabel?: string;
};

export default function TodoForm({
  defaultValues,
  onSubmit,
  submitLabel = "Tambah",
}: TodoFormProps) {
  const [prioritas, setPrioritas] = useState<(typeof PRIORITAS)[number]>(
    defaultValues?.prioritas ?? "rendah",
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(defaultValues?.tags ?? []);

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput)) return;

    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const [state, formAction] = useActionState(onSubmit, null);

  useEffect(() => {
    if (defaultValues) {
      setPrioritas(defaultValues.prioritas);
      setTags(defaultValues.tags ?? []);
    }
  }, [defaultValues]);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="title">Title *</Label>
          <Input
            type="title"
            name="title"
            placeholder="title...."
            defaultValue={defaultValues?.title ?? ""}
          />
        </div>
        <div aria-live="polite" aria-atomic="true">
          <p className="text-red-500 text-sm mt-2">{state?.error?.title}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="deskripsi">Deskripsi *</Label>
          <Textarea
            id="deskripsi"
            name="deskripsi"
            placeholder="Tambahkan deskripsi..."
            rows={3}
            defaultValue={defaultValues?.deskripsi ?? ""}
          />
        </div>
        <div aria-live="polite" aria-atomic="true">
          <p className="text-red-500 text-sm mt-2">{state?.error?.deskripsi}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Prioritas</Label>
        <div className="flex gap-2">
          {PRIORITAS.map((p) => (
            <Button
              key={p}
              type="button"
              variant={prioritas === p ? "default" : "outline"}
              onClick={() => setPrioritas(p)}
            >
              {p}
            </Button>
          ))}
        </div>
        <input type="hidden" name="prioritas" value={prioritas} />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Tambah tag..."
          />
          <Button type="button" variant="secondary" onClick={addTag}>
            Tambah
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      </div>

      <div className="space-y-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
