
import { Link, useLocation } from "react-router-dom";
import { Building2, Calendar, Home, MessageSquare, Users, LogIn, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Properties", icon: Building2, path: "/properties" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Applications", icon: FileText, path: "/applications" },
  ];

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col transition-all duration-300 ease-in-out bg-white border-r border-gray-200",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className={cn("font-semibold transition-all", expanded ? "opacity-100" : "opacity-0")}>
          RealEstate SaaS
        </h1>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={expanded ? "M15 19l-7-7 7-7" : "M9 19l7-7-7-7"}
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all",
              location.pathname === item.path
                ? "bg-primary text-white"
                : "hover:bg-gray-100",
              !expanded && "justify-center"
            )}
          >
            <item.icon className="w-6 h-6" />
            {expanded && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
        
        <Link
          to="/auth/login"
          className={cn(
            "flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all mt-auto",
            location.pathname === "/auth/login"
              ? "bg-primary text-white"
              : "hover:bg-gray-100",
            !expanded && "justify-center"
          )}
        >
          <LogIn className="w-6 h-6" />
          {expanded && <span className="ml-3">Connexion</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
