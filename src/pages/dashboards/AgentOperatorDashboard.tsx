
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Users, Calendar, FileText, Search, Eye, MessageSquare, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AgentOperatorDashboard = () => {
  // Exemple de propriétés gérées par l'agent opérateur
  const properties = [
    { 
      id: 1, 
      address: "123 Rue de Paris", 
      type: "Appartement", 
      status: "Disponible", 
      owner: "Jean Dupont",
      applications: 3,
      visits: 5
    },
    { 
      id: 2, 
      address: "45 Avenue Victor Hugo", 
      type: "Maison", 
      status: "Occupé", 
      owner: "Pierre Durand",
      applications: 0,
      visits: 0
    },
    { 
      id: 3, 
      address: "8 Boulevard des Capucines", 
      type: "Studio", 
      status: "Disponible", 
      owner: "Jean Dupont", 
      applications: 5,
      visits: 8
    },
  ];

  // Exemple de visites planifiées
  const scheduledVisits = [
    { 
      id: 1, 
      property: "123 Rue de Paris", 
      date: "15/06/2023", 
      time: "14:00", 
      tenant: "Thomas Dubois",
      agent: "Camille Roux"
    },
    { 
      id: 2, 
      property: "123 Rue de Paris", 
      date: "15/06/2023", 
      time: "16:30", 
      tenant: "Marie Laurent",
      agent: "Camille Roux"
    },
    { 
      id: 3, 
      property: "8 Boulevard des Capucines", 
      date: "16/06/2023", 
      time: "10:00", 
      tenant: "Sophie Martin",
      agent: "Camille Roux"
    },
  ];

  // Exemple de demandes en attente
  const pendingApplications = [
    { 
      id: 1, 
      property: "123 Rue de Paris", 
      applicant: "Thomas Dubois", 
      date: "10/06/2023", 
      status: "En attente"
    },
    { 
      id: 2, 
      property: "123 Rue de Paris", 
      applicant: "Marie Laurent", 
      date: "11/06/2023", 
      status: "En attente" 
    },
    { 
      id: 3, 
      property: "8 Boulevard des Capucines", 
      applicant: "Sophie Martin", 
      date: "12/06/2023", 
      status: "En attente"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Agent Opérateur</h1>
            <p className="text-muted-foreground">Gérez les biens, les visites et les candidatures</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un bien
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Planifier une visite
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Biens gérés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
              <p className="text-xs text-muted-foreground">
                2 disponibles, 1 occupé
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites planifiées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledVisits.length}</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Demandes en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
              <p className="text-xs text-muted-foreground">
                À traiter
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Agents mobiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Actif cette semaine
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="properties">
          <TabsList className="mb-4">
            <TabsTrigger value="properties">Biens immobiliers</TabsTrigger>
            <TabsTrigger value="visits">Visites planifiées</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
                <CardTitle>Biens gérés</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Rechercher un bien..."
                    className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Building2 className="h-10 w-10 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{property.address}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={property.status === "Disponible" ? "success" : "secondary"}
                            >
                              {property.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {property.type} • Propriétaire: {property.owner}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-center px-3">
                          <p className="font-bold">{property.applications}</p>
                          <p className="text-xs text-muted-foreground">Candidatures</p>
                        </div>
                        <div className="text-center px-3">
                          <p className="font-bold">{property.visits}</p>
                          <p className="text-xs text-muted-foreground">Visites</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visits">
            <Card>
              <CardHeader>
                <CardTitle>Visites planifiées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledVisits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Calendar className="h-10 w-10 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{visit.property}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge>
                              {visit.date} à {visit.time}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Locataire: {visit.tenant}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=6`} />
                            <AvatarFallback>CR</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{visit.agent}</p>
                            <p className="text-xs text-muted-foreground">Agent mobile</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contacter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Candidatures en attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{application.property}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="warning">
                              {application.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Par {application.applicant} le {application.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                          <Check className="h-4 w-4 mr-2" />
                          Accepter
                        </Button>
                        <Button variant="destructive" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AgentOperatorDashboard;
