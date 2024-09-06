import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/navbar/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full ">
        <div className="flex flex-col min-h-[calc(100vh-160px)]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
