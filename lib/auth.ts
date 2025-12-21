"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { client } from "@/app/supabase-auth/supabase";

export function useRequireSession(redirectTo = "/") {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let canceled = false;

    const verifySession = async () => {
      const { data } = await client.auth.getSession();
      if (canceled) return;

      if (!data.session) {
        router.replace(redirectTo);
        return;
      }

      setIsChecking(false);
    };

    const { data: listener } = client.auth.onAuthStateChange((_, session) => {
      if (canceled) return;

      if (session) {
        setIsChecking(false);
        return;
      }

      router.replace(redirectTo);
    });

    verifySession();

    return () => {
      canceled = true;
      listener?.subscription.unsubscribe();
    };
  }, [redirectTo, router]);

  return isChecking;
}

export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const router = useRouter();

  useEffect(() => {
    let canceled = false;

    const checkSession = async () => {
      const { data } = await client.auth.getSession();

      if (canceled || !data.session) {
        return;
      }

      router.replace(redirectTo);
    };

    const { data: listener } = client.auth.onAuthStateChange((_, session) => {
      if (canceled || !session) {
        return;
      }

      router.replace(redirectTo);
    });

    checkSession();

    return () => {
      canceled = true;
      listener?.subscription.unsubscribe();
    };
  }, [redirectTo, router]);
}
