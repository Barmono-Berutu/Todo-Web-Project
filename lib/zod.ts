import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  prioritas: z.enum(["rendah", "menengah", "tinggi"]),
  tags: z.array(z.string()).optional(),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name must be more than 1 character"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });
