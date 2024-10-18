import Sidebar from "@/components/sidebar/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
