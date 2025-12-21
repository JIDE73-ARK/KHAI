"use client";

import type React from "react";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/app/supabase-auth/supabase";

interface LoginFormProps {
  onError: (error: string | null) => void;
}

export function LoginForm({ onError }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const trimmedEmail = useMemo(() => email.trim(), [email]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setResetMessage(null);
      onError(null);

      try {
        const { error } = await client.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error) {
          throw error;
        }

        router.push("/dashboard");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "No fue posible iniciar sesión.";
        onError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [onError, password, router, trimmedEmail]
  );

  const handleForgot = useCallback(async () => {
    if (!trimmedEmail) {
      setResetMessage("Ingresa tu correo para recibir el enlace.");
      return;
    }

    setResetMessage("Enviando enlace...");

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/dashboard`
        : undefined;

    const { error } = await client.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo,
    });

    if (error) {
      setResetMessage("No fue posible generar el enlace. Intenta nuevamente.");
      return;
    }

    setResetMessage("Revisa tu bandeja para restablecer la contraseña.");
  }, [trimmedEmail]);

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={handleForgot}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="bg-background"
            />
          </div>

          {resetMessage && (
            <p className="text-sm text-muted-foreground">{resetMessage}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
