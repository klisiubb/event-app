"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarItemProps } from "./misc/interface";
import { useTransitionRouter } from "next-view-transitions";
//TODO Fix isActive is not working on mobile (bg and border!!!)

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useTransitionRouter();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2  text-sm font-[500] pl-6 transition-all hover:text-primary hover:font-semibold hover:bg-slate-300/20",
        isActive && "text-primary font-bold bg-accent/50"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("", isActive && "text-primary")} />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-primary h-full transition-all",
          isActive && "opacity-100 animate-pulse"
        )}
      />
    </button>
  );
};
