"use client";
import { SidebarItemProps } from "./misc/interface";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = ({ routes }: { routes: SidebarItemProps[] }) => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
