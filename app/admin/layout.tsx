import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/navbar/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event App - Admin Panel",
  description: "Event App - Admin Panel",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full ">{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
