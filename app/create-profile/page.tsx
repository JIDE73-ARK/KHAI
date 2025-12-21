"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequireSession } from "@/lib/auth";

const ROLE_TYPES = [
  { value: "owner", label: "Owner" },
  { value: "member", label: "Member" },
] as const;

type RoleType = (typeof ROLE_TYPES)[number]["value"];

export default function CreateProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCheckingSession = useRequireSession();
  const presetEmail = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams]
  );

  const [name, setName] = useState("");
  const [role, setRole] = useState<RoleType>("owner");
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const isOwner = role === "owner";

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setStatusMessage(null);

      if (!name.trim()) {
        setStatusMessage("Agrega un nombre para continuar.");
        setIsSubmitting(false);
        return;
      }

      if (isOwner && !teamName.trim()) {
        setStatusMessage("El owner debe nombrar el equipo.");
        setIsSubmitting(false);
        return;
      }

      if (!isOwner && !teamCode.trim()) {
        setStatusMessage("El member debe ingresar el código del equipo.");
        setIsSubmitting(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

      // Placeholder para futura integración con backend.
      console.info("Perfil creado", {
        email: presetEmail,
        name,
        role,
        teamName,
        teamCode,
      });

      router.push("/dashboard");
    },
    [isOwner, name, presetEmail, role, teamCode, teamName, router]
  );

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Verificando sesión…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-lg space-y-6">
        <header className="text-center">
          <p className="text-sm text-muted-foreground">
            Paso 2 · Completa tu perfil
          </p>
          <h1 className="text-2xl font-bold text-foreground">Define tu rol</h1>
          {presetEmail && (
            <p className="text-sm text-muted-foreground">
              Email: {presetEmail}
            </p>
          )}
        </header>

        <Card>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nombre completo</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="space-y-2">
                <Label>Rol</Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as RoleType)}
                >
                  <SelectTrigger size="default">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {ROLE_TYPES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isOwner ? (
                <div className="space-y-2">
                  <Label htmlFor="team-name">Nombre del team</Label>
                  <Input
                    id="team-name"
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                    placeholder="e.g. Aurora Labs"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="team-code">Código de team</Label>
                  <Input
                    id="team-code"
                    value={teamCode}
                    onChange={(event) => setTeamCode(event.target.value)}
                    placeholder="XXXXX-12345"
                  />
                </div>
              )}

              {statusMessage && (
                <p className="text-sm text-destructive">{statusMessage}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Continuar a dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
