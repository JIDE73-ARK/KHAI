"use client";
import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRedirectIfAuthenticated } from "@/lib/auth";

type AuthTabsProps = {
  onError: (error: string | null) => void;
};

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  useRedirectIfAuthenticated();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <section className="w-full max-w-md space-y-6">
        <AuthIntro />

        {error && (
          <Alert variant="destructive" className="mb-0">
            <AlertCircle className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AuthTabs onError={setError} />
      </section>
    </main>
  );
}

function AuthIntro() {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">K</span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          KnowledgeHub AI
        </h1>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Access your company knowledge base with secure, AI-powered login.
      </p>
    </div>
  );
}

function AuthTabs({ onError }: AuthTabsProps) {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1">
        <TabsTrigger value="login" className="rounded-full">
          Sign in
        </TabsTrigger>
        <TabsTrigger value="register" className="rounded-full">
          Sign up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm onError={onError} />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
