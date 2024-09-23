import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="p-4 border-b h-16 flex items-center shadow-sm">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </div>
  );
};
