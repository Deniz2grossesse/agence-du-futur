
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserHeader from "@/components/users/UserHeader";
import UserFilter from "@/components/users/UserFilter";
import UserTable from "@/components/users/UserTable";
import { User } from "@/types/user";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Updated users data with the correct roles
  const users: User[] = [
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
      role: "agent-operator",
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <UserHeader />

        <Card>
          <CardHeader className="pb-3">
            <UserFilter 
              totalUsers={filteredUsers.length}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </CardHeader>
          <CardContent className="p-0">
            <UserTable users={filteredUsers} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
