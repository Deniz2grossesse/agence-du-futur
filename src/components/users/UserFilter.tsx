
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface UserFilterProps {
  totalUsers: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UserFilter = ({ totalUsers, searchTerm, onSearchChange }: UserFilterProps) => {
  const { user } = useAuth();
  const isTenant = user && user.role === 'tenant';

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Tous les utilisateurs</CardTitle>
        <div className="relative w-full sm:w-64">
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            startIcon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>
      <CardDescription>
        {totalUsers} utilisateurs au total
      </CardDescription>
      <Tabs defaultValue="all" className="mt-2">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          {/* Les locataires ne peuvent voir que les locataires */}
          {!isTenant && <TabsTrigger value="tenant">Locataires</TabsTrigger>}
          {!isTenant && <TabsTrigger value="owner">Propriétaires</TabsTrigger>}
          {!isTenant && <TabsTrigger value="agent-operator">Agents Opérateurs</TabsTrigger>}
          {!isTenant && <TabsTrigger value="mobile-agent">Agents Mobiles</TabsTrigger>}
        </TabsList>
      </Tabs>
    </>
  );
};

export default UserFilter;
