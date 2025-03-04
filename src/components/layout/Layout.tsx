
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded} />
      <main className={`transition-all duration-300 ${
        sidebarExpanded ? "pl-64" : "pl-20"
      } pt-16`}>
        <div className="container py-8 px-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
