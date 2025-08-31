import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { SignInForm } from "./_components/sign-in-form";

const Page = async () => {
  const session = await auth();
  console.log(session);
  if (session?.user?.role === Role.ADMIN) redirect("/admin");
  if (session?.user?.role === Role.BUYER) redirect("/artist");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default Page;
