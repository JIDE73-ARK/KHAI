"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ConfirmationState = "pending" | "success" | "error";

export default function ConfirmPage() {
  const router = useRouter();
  const [status, setStatus] = useState<ConfirmationState>("pending");
  const [message, setMessage] = useState("Verificando confirmación...");

  const statusTone = useMemo(() => {
    if (status === "success") return "text-emerald-500";
    if (status === "error") return "text-destructive";
    return "text-muted-foreground";
  }, [status]);

  const goToLogin = useCallback(() => {
    router.push("/");
  }, [router]);

  const searchParams = useSearchParams();

  useEffect(() => {
    let active = true;

    setStatus("pending");
    setMessage("Verificando confirmación...");

    const handleConfirmation = () => {
      if (!active) return;

      const errorDescription = searchParams.get("error_description");
      const type = searchParams.get("type");

      if (errorDescription) {
        setStatus("error");
        setMessage(errorDescription);
        return;
      }

      if (type === "signup") {
        setStatus("success");
        setMessage("Cuenta confirmada correctamente. Puedes ir al login.");
        return;
      }

      setStatus("error");
      setMessage("No se pudo confirmar la cuenta.");
    };

    handleConfirmation();

    return () => {
      active = false;
    };
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full border-border">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-semibold text-foreground">
            Confirmación de correo
          </h1>
          <p className={`text-sm leading-relaxed ${statusTone}`}>{message}</p>
          <div className="flex justify-end">
            <Button onClick={goToLogin} className="w-full">
              Ir al login
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
