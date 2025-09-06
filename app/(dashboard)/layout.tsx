// app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(dashboard)/_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const raw = await auth();

  const userForClient = raw?.user
    ? {
        name: raw.user.name ?? null,
        email: raw.user.email ?? null,
        image: raw.user.image ?? null,
        role: (raw.user as any)?.role ?? "BUYER",
      }
    : undefined;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={userForClient} />
      <SidebarInset
        className={cn(
          "data-[content-layout=centered]:!mx-auto data-[content-layout=centered]:max-w-screen-2xl",
          "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto"
        )}
      >
        <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
        </header>
        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
