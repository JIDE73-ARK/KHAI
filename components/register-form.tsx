"use client";

import type React from "react";
import { client } from "@/app/supabase-auth/supabase";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type SubmissionStatus = "success" | "error";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedEmail = useMemo(() => email.trim(), [email]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (password !== confirmPassword) {
        setStatus("error");
        setStatusMessage("Las contraseñas no coinciden.");
        return;
      }

      if (password.length < 8) {
        setStatus("error");
        setStatusMessage("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (!trimmedEmail) {
        setStatus("error");
        setStatusMessage("Agrega un correo válido.");
        return;
      }

      setIsSubmitting(true);
      setStatus(null);
      setStatusMessage(null);

      try {
        const { error } = await client.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            emailRedirectTo: "http://localhost:3000/confirm",
          },
        });

        if (error) {
          throw error;
        }

        setStatus("success");
        setStatusMessage("Cuenta creada. Completa tu perfil.");
        router.push(
          `/create-profile?email=${encodeURIComponent(trimmedEmail)}`
        );
      } catch (error) {
        console.error(error);
        const message =
          error instanceof Error
            ? error.message
            : "No fue posible crear la cuenta.";
        setStatus("error");
        setStatusMessage(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [confirmPassword, password, router, trimmedEmail]
  );

  const statusClass =
    status === "success" ? "text-emerald-500" : "text-destructive";

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-email">Correo electrónico</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="my-email@domain.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              className="bg-background"
            />
          </div>

          {statusMessage && (
            <p className={`text-sm ${statusClass}`}>{statusMessage}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
