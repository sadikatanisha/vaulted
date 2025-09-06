"use client";

import { Command } from "lucide-react";
import { useMemo } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// <-- import Role type from your sidebar-items file
import { sidebarItems, type Role } from "@/navigation/sidebar/sidebar-items";
import { filterSidebarItemsByRole } from "@/navigation/sidebar/nav-utils";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// minimal user shape we pass down from the server layout
type MinimalUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: Role | null;
};

// extend the Sidebar props with `user`
export function AppSidebar({
  user,
  ...props
}: { user?: MinimalUser } & React.ComponentProps<typeof Sidebar>) {
  const role: Role | undefined = (user?.role ?? undefined) as Role | undefined;

  const visibleItems = useMemo(
    () => filterSidebarItemsByRole(sidebarItems, role),
    [role]
  );

  const navUser = {
    name: user?.name ?? "Guest",
    email: user?.email ?? "",
    avatar: user?.image ?? "",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Command />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={visibleItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
