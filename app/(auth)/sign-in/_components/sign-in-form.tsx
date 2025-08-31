"use client";
import { useSignIn } from "@/app/(auth)/sign-in/_services/use-mutations";
import {
  signInDefaultValues,
  signInSchema,
  SignInSchema,
} from "@/app/(auth)/sign-in/_types/signInSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const SignInForm = () => {
  const form = useForm<SignInSchema>({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useSignIn();

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    signInMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-md space-y-6 rounded-md px-8 py-10"
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="Sign in form"
      >
        <div className="text-center">
          <h2 className="mb-1 text-2xl font-semibold">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        {/* inputs: only bottom borders (minimalist) */}
        <div className="space-y-4">
          <ControlledInput<SignInSchema>
            name="email"
            label="Email"
            className="border-b pb-2 border-stone-200  focus:border-primary focus:outline-none bg-transparent placeholder:opacity-60"
          />

          <ControlledInput<SignInSchema>
            name="password"
            label="Password"
            type="password"
            className="border-b pb-2 border-stone-200  focus:border-primary focus:outline-none bg-transparent placeholder:opacity-60"
          />
        </div>

        <Button
          className="w-full rounded-full py-2"
          isLoading={signInMutation.isPending}
        >
          Sign In
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-stone-400 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignInForm };
