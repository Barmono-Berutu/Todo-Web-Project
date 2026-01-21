"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RegisterSchema, SignInSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut as nextSignOut } from "@/auth";

export const singUpCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validateFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validateFields.data;
  const hashPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
  } catch (error) {
    return { message: "Failed to register user" };
  }

  redirect("/login");
};

export const signInCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  const validateFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/todos" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials." };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw error;
  }
};

export async function signOutAction() {
  await nextSignOut({ redirectTo: "/login" });
}
