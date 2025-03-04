
import { Bell, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  sidebarExpanded: boolean;
}

const Header = ({ sidebarExpanded }: HeaderProps) => {
  return (
    <header className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between transition-all duration-300 ${
      sidebarExpanded ? "w-[calc(100%-16rem)]" : "w-[calc(100%-5rem)]"
    }`}>
      <div className="flex items-center flex-1">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Rechercher..."
          className="ml-2 w-full max-w-xs bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Settings className="w-5 h-5" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuItem>Déconnexion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
