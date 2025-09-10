import React from "react";
import ArtworkForm from "./_components/artwork-form";
import { auth } from "@/lib/auth";

export default async function page() {
  const session = await auth();

  return (
    <div className="max-w-8xl mx-auto p-6 rounded-lg shadow-sm ">
      <ArtworkForm userId={session?.user?.id} />
    </div>
  );
}
