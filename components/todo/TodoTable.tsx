"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DeleteButton, DetailsButton, EditButton } from "../ButtonComponent";

type Todo = {
  id: string;
  title: string;
  deskripsi: string;
  prioritas: string;
  tags: string[];
  isDone: boolean;
  createdAt: string;
};

const columns: ColumnDef<Todo>[] = [
  {
    id: "done",
    header: "",
    cell: ({ row }) => <Checkbox checked={row.original.isDone} disabled />,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
    cell: ({ getValue }) => {
      const text = getValue<string>();
      const maxLength = 30; // maksimal karakter
      const displayText =
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      return <span title={text}>{displayText}</span>;
    },
  },

  {
    accessorKey: "prioritas",
    header: "Prioritas",
    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1">
        {getValue<string[]>().map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditButton id={row.original.id} />
        <DeleteButton id={row.original.id} />
        <DetailsButton todo={row.original} />
      </div>
    ),
  },
];

export default function TodoTable({ data }: { data: Todo[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Belum ada todo
              </TableCell>
            </TableRow>
          )}

          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
