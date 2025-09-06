export type Role = "ADMIN" | "SELLER" | "BUYER";
import type { NavGroup } from "./sidebar-items";

export function filterSidebarItemsByRole(
  items: NavGroup[],
  role?: Role | null
) {
  return items
    .map((group) => {
      const filtered = group.items.filter((it) => {
        if (!it.roles || it.roles.length === 0) return true; // public
        if (!role) return false; // guest cannot see role-protected items
        return it.roles.includes(role as Role);
      });
      return { ...group, items: filtered };
    })
    .filter((g) => g.items.length > 0);
}
