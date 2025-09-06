"use client";

import {
  LayoutDashboard,
  ChartBar,
  ShoppingBag,
  Camera,
  Tag,
  Users,
  Banknote,
  Gauge,
  ReceiptText,
  List,
  Clock,
  Clock1,
  type LucideIcon,
} from "lucide-react";

export type Role = "ADMIN" | "SELLER" | "BUYER";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
  roles?: Role[];
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
  roles?: Role[];
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Explore",
    items: [
      { title: "Auctions", url: "/auctions", icon: List }, // public
      { title: "Live Now", url: "/auctions/live", icon: Clock1, isNew: true }, // public
      { title: "Upcoming", url: "/auctions/upcoming", icon: Clock },
      { title: "Ended", url: "/auctions/ended", icon: ReceiptText },
      { title: "Discover", url: "/discover", icon: Gauge },
    ],
  },
  {
    id: 2,
    label: "Collections",
    items: [
      { title: "All Collections", url: "/collections", icon: Camera },
      {
        title: "My Collections",
        url: "/collections/mine",
        icon: Camera,
        roles: ["SELLER", "BUYER"],
      },
      {
        title: "Favorites",
        url: "/collections/favorites",
        icon: ShoppingBag,
        roles: ["BUYER"],
      },
    ],
  },
  {
    id: 3,
    label: "Artist",
    items: [
      {
        title: "Create Listing",
        url: "/artist/new",
        icon: Tag,
        roles: ["SELLER"],
      },
      {
        title: "My Listings",
        url: "/artist/listings",
        icon: Tag,
        roles: ["SELLER"],
      },
      {
        title: "Drafts",
        url: "/artist/drafts",
        icon: ReceiptText,
        roles: ["SELLER"],
      },
      {
        title: "Sales & Orders",
        url: "/artist/sales",
        icon: Banknote,
        roles: ["SELLER"],
      },
      {
        title: "Payouts",
        url: "/artist/payouts",
        icon: Banknote,
        roles: ["SELLER"],
      },
    ],
  },
  {
    id: 4,
    label: "Collector",
    items: [
      {
        title: "My Bids",
        url: "/collector/bids",
        icon: ShoppingBag,
        roles: ["BUYER"],
      },
      {
        title: "Watchlist",
        url: "/collector/watchlist",
        icon: Tag,
        roles: ["BUYER"],
      },
      {
        title: "Purchases",
        url: "/collector/purchases",
        icon: ReceiptText,
        roles: ["BUYER"],
      },
    ],
  },
  {
    id: 5,
    label: "Payments & Reports",
    items: [
      {
        title: "Billing",
        url: "/billing",
        icon: Banknote,
        roles: ["SELLER", "BUYER"],
      },
      {
        title: "Invoices",
        url: "/billing/invoices",
        icon: ReceiptText,
        roles: ["SELLER", "BUYER"],
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: ChartBar,
        comingSoon: false,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    id: 6,
    label: "Admin",
    items: [
      { title: "Users", url: "/admin/users", icon: Users, roles: ["ADMIN"] },
      {
        title: "Listings Review",
        url: "/admin/listings",
        icon: Tag,
        roles: ["ADMIN"],
      },
      {
        title: "Payments",
        url: "/admin/payments",
        icon: Banknote,
        roles: ["ADMIN"],
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: LayoutDashboard,
        roles: ["ADMIN"],
      },
    ],
  },
];
