
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Search, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample users data
  const users = [
    { 
      id: 1, 
      name: "Thomas Dubois", 
      email: "thomas.dubois@example.com", 
      role: "tenant",
      properties: 0,
      status: "active",
      joinDate: "15/02/2023",
    },
    { 
      id: 2, 
      name: "Marie Laurent", 
      email: "marie.laurent@example.com", 
      role: "tenant",
      properties: 0,
      status: "active",
      joinDate: "03/05/2023",
    },
    { 
      id: 3, 
      name: "Jean Dupont", 
      email: "jean.dupont@example.com", 
      role: "owner",
      properties: 3,
      status: "active",
      joinDate: "12/01/2023",
    },
    { 
      id: 4, 
      name: "Sophie Martin", 
      email: "sophie.martin@example.com", 
      role: "agent",
      properties: 12,
      status: "active",
      joinDate: "28/08/2022",
    },
    { 
      id: 5, 
      name: "Pierre Durand", 
      email: "pierre.durand@example.com", 
      role: "owner",
      properties: 2,
      status: "inactive",
      joinDate: "10/11/2022",
    },
    { 
      id: 6, 
      name: "Camille Roux", 
      email: "camille.roux@example.com", 
      role: "mobile-agent",
      properties: 8,
      status: "active",
      joinDate: "05/04/2023",
    },
  ];

  const getUserRoleLabel = (role: string) => {
    switch(role) {
      case 'tenant':
        return 'Locataire';
      case 'owner':
        return 'Propriétaire';
      case 'agent':
        return 'Agent immobilier';
      case 'mobile-agent':
        return 'Agent mobile';
      default:
        return role;
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Utilisateurs</h1>
            <p className="text-muted-foreground">
              Gérez les utilisateurs de la plateforme
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Tous les utilisateurs</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <CardDescription>
              {filteredUsers.length} utilisateurs au total
            </CardDescription>
            <Tabs defaultValue="all" className="mt-2">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="tenant">Locataires</TabsTrigger>
                <TabsTrigger value="owner">Propriétaires</TabsTrigger>
                <TabsTrigger value="agent">Agents</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Biens</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${user.id}`} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getUserRoleLabel(user.role)}</Badge>
                    </TableCell>
                    <TableCell>{user.properties}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
