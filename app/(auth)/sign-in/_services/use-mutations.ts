// app/(auth)/sign-in/_services/use-mutations.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { SignInSchema } from "../_types/signInSchema";

const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignInSchema) => {
      // signIn returns a Promise that resolves to an object when redirect:false
      const res = (await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })) as unknown as { ok?: boolean; error?: string } | undefined;

      if (!res) throw new Error("Sign in failed");
      if (res.error) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      toast.success("Signed in");
      // navigate to dashboard or refresh
      router.push("/seller");
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Sign in failed");
    },
  });
};

const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      // client signOut
      await (await import("next-auth/react")).signOut({ redirect: false });
    },
  });
};

export { useSignIn, useSignOut };
