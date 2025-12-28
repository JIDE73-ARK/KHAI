"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { request } from "@/lib/req";

type Status = "idle" | "loading" | "success" | "error";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const code = useMemo(
    () => searchParams.get("access_token")?.trim() ?? "",
    [searchParams]
  );

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Procesando el código recibido...");
  const [retryCount, setRetryCount] = useState(0);

  const confirmCode = useCallback(async () => {

    setStatus("loading");
    setMessage("Validando el código con el servidor...");

    try {
      await request("/auth/confirm", "POST", { codigo: code });
      setStatus("success");
      setMessage("Código confirmado. Puedes volver a la aplicación.");
    } catch (error) {
      setStatus("error");
      setMessage(
        "No pudimos confirmar el código. Inténtalo de nuevo o solicita un nuevo enlace."
      );
    }
  }, [code]);

  useEffect(() => {
    void confirmCode();
  }, [confirmCode, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount((value) => value + 1);
  }, []);

  const isLoading = status === "loading";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-2">
          <CardTitle>Confirmación de código</CardTitle>
          <p className="text-sm text-muted-foreground">
            Extraemos el parámetro <code>codigo</code> de la URL para validar tu
            sesión con el proveedor de autenticación.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted/40 p-3 text-sm">
            <p
              className={
                status === "error"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }
            >
              {message}
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
              <span>Procesando...</span>
            </div>
          )}

          {status === "error" && code && (
            <Button
              onClick={handleRetry}
              disabled={isLoading}
              className="w-full"
            >
              Reintentar
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
