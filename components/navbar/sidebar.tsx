"use client";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { adminRoutes } from "@/components/navbar/misc/sidebar-routes";
// TODO Dynamic routes on pathname
export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes routes={adminRoutes} />
      </div>
    </div>
  );
};
