"use client";
import { useSignUp } from "@/app/(auth)/sign-up/_services/use-mutations";
import {
  signUpDefaultValues,
  signUpSchema,
  SignUpSchema,
} from "@/app/(auth)/sign-up/_types/signUpSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Role = "buyer" | "seller";
type FormValues = SignUpSchema & { role: Role };

const SignUpForm = () => {
  const defaultValues = {
    ...(signUpDefaultValues as object),
    role: "buyer",
  } as FormValues;

  const form = useForm<FormValues>({
    defaultValues,

    resolver: zodResolver(signUpSchema as any),
  });

  const signUpMutation = useSignUp();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUpMutation.mutate(data);
  };

  const selectedRole = form.watch("role");

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-96 space-y-6 rounded-2xl border bg-white/60 px-8 py-10 backdrop-blur-md shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="text-center">
          <h2 className="mb-1 text-2xl font-semibold">Create Account</h2>
          <p className="text-muted-foreground text-sm">
            Sign up to get started
          </p>
        </div>

        {/* Role selector (modern segmented control) */}
        <div>
          <label className="mb-2 block text-sm font-medium">Account type</label>
          <div
            role="radiogroup"
            aria-label="Select account type"
            className="inline-flex rounded-lg border px-1 py-1"
          >
            {/* User option */}
            <button
              type="button"
              aria-pressed={selectedRole === "buyer"}
              onClick={() =>
                form.setValue("role", "buyer", { shouldValidate: true })
              }
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition ${
                selectedRole === "buyer"
                  ? "bg-primary text-white shadow"
                  : "bg-transparent text-gray-700 hover:bg-gray-50"
              }`}
            >
              {/* user icon */}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Collector</span>
            </button>

            {/* Seller option */}
            <button
              type="button"
              aria-pressed={selectedRole === "seller"}
              onClick={() =>
                form.setValue("role", "seller", { shouldValidate: true })
              }
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition ${
                selectedRole === "seller"
                  ? "bg-primary text-white shadow"
                  : "bg-transparent text-gray-700 hover:bg-gray-50"
              }`}
            >
              {/* shop icon */}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M3 9l1-2h16l1 2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 22h14V9H5v13z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 9V7a4 4 0 014-4h0a4 4 0 014 4v2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Artist / Seller</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <ControlledInput<FormValues> name="name" label="Full Name" />
          <ControlledInput<FormValues> name="email" label="Email" />
          <ControlledInput<FormValues>
            name="password"
            label="Password"
            type="password"
          />
          <ControlledInput<FormValues>
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </div>

        <Button className="w-full" isLoading={signUpMutation.isPending}>
          Sign Up
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignUpForm };
