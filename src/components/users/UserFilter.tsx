
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";

interface UserFilterProps {
  totalUsers: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UserFilter = ({ totalUsers, searchTerm, onSearchChange }: UserFilterProps) => {
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
          <TabsTrigger value="tenant">Locataires</TabsTrigger>
          <TabsTrigger value="owner">Propriétaires</TabsTrigger>
          <TabsTrigger value="agent-operator">Agents Opérateurs</TabsTrigger>
          <TabsTrigger value="mobile-agent">Agents Mobiles</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default UserFilter;
