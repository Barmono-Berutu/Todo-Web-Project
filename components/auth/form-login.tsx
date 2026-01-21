"use client";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthButton } from "../ButtonComponent";
import { Mail, Lock } from "lucide-react";
import { signInCredentials } from "@/lib/action";

const FormLogin = () => {
  const [state, formAction] = useActionState(signInCredentials, null);

  return (
    <form action={formAction} className="space-y-4 ">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nama@email.com"
            className="pl-10"
          />
        </div>
        <div aria-live="polite" aria-atomic="true">
          <p className="text-red-500 text-sm mt-2">{state?.error?.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Minimal 8 karakter"
            className="pl-10 pr-10"
          />
        </div>
        <div aria-live="polite" aria-atomic="true">
          <p className="text-red-500 text-sm mt-2">{state?.error?.password}</p>
        </div>
      </div>

      <AuthButton label="Login" />

      <div className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <a
          href="/register"
          className="text-primary hover:underline font-medium"
        >
          Buat di sini
        </a>
      </div>
    </form>
  );
};

export default FormLogin;
