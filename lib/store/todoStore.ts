import { create } from "zustand";
import { persist } from "zustand/middleware";

type Todo = {
  id: string;
  title: string;
  deskripsi: string;
  prioritas: string;
  tags: string[];
  isDone: boolean;
  createdAt: string;
};

type TodoStore = {
  selectedTodo: Todo | null;
  todos: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
  clearSelectedTodo: () => void;
  setTodos: (todos: Todo[]) => void;
  findTodoById: (id: string) => Todo | null;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      selectedTodo: null,
      todos: [],
      setSelectedTodo: (todo) => set({ selectedTodo: todo }),
      clearSelectedTodo: () => set({ selectedTodo: null }),
      setTodos: (todos) => set({ todos }),
      findTodoById: (id) => {
        const { todos } = get();
        return todos.find((todo) => todo.id === id) || null;
      },
    }),
    {
      name: "todo-storage",
    },
  ),
);
