import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample applications data
  const applications = [
    { 
      id: 1, 
      property: "Appartement T3 - Paris", 
      applicant: "Thomas Dubois", 
      status: "pending",
      submittedDate: "15/05/2023",
      documents: 6
    },
    { 
      id: 2, 
      property: "Studio - Lyon", 
      applicant: "Marie Laurent", 
      status: "approved",
      submittedDate: "03/05/2023",
      documents: 4
    },
    { 
      id: 3, 
      property: "Maison T4 - Nantes", 
      applicant: "Jean Dupont", 
      status: "rejected",
      submittedDate: "12/04/2023",
      documents: 5
    },
    { 
      id: 4, 
      property: "Appartement T2 - Marseille", 
      applicant: "Sophie Martin", 
      status: "pending",
      submittedDate: "28/05/2023",
      documents: 3
    },
  ];

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Refusé';
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'pending':
        return 'secondary';
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredApplications = applications.filter(application => 
    application.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.applicant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dossiers de location</h1>
            <p className="text-muted-foreground">
              Gérez les dossiers de candidature
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau dossier
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Tous les dossiers</CardTitle>
              <div className="relative w-full sm:w-64">
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startIcon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>
            <CardDescription>
              {filteredApplications.length} dossiers au total
            </CardDescription>
            <Tabs defaultValue="all" className="mt-2">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="approved">Approuvés</TabsTrigger>
                <TabsTrigger value="rejected">Refusés</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bien</TableHead>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.property}</TableCell>
                    <TableCell>{application.applicant}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{application.documents} documents</span>
                      </div>
                    </TableCell>
                    <TableCell>{application.submittedDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(application.status) as any}>
                        {getStatusLabel(application.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Voir le dossier</Button>
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

export default Applications;
