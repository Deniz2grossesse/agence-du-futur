
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Wrench, Clock, CheckCircle, AlertCircle, Settings } from "lucide-react";
import { useState } from "react";

// Types d'incidents et de travaux
type TicketStatus = "ouvert" | "en cours" | "terminé" | "annulé";
type TicketPriority = "urgente" | "haute" | "moyenne" | "basse";

interface MaintenanceTicket {
  id: number;
  title: string;
  property: string;
  tenant: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: string;
  dateCreated: string;
  dateClosed?: string;
  assignedTo?: string;
  cost?: number;
  description: string;
}

// Données factices pour les tickets de maintenance
const tickets: MaintenanceTicket[] = [
  {
    id: 1,
    title: "Fuite d'eau sous évier",
    property: "Appartement T3 - Paris 9e",
    tenant: "Sophie Martin",
    status: "en cours",
    priority: "haute",
    type: "Plomberie",
    dateCreated: "01/09/2023",
    assignedTo: "Plomberie Express",
    description: "Fuite importante sous l'évier de la cuisine. Le locataire a coupé l'arrivée d'eau sous l'évier."
  },
  {
    id: 2,
    title: "Problème de chauffage",
    property: "Studio - Lyon 3e",
    tenant: "Thomas Dubois",
    status: "ouvert",
    priority: "moyenne",
    type: "Chauffage",
    dateCreated: "02/09/2023",
    description: "Le radiateur de la pièce principale ne chauffe plus correctement."
  },
  {
    id: 3,
    title: "Serrure porte d'entrée",
    property: "Maison T4 - Nice",
    tenant: "Emma Petit",
    status: "terminé",
    priority: "urgente",
    type: "Serrurerie",
    dateCreated: "28/08/2023",
    dateClosed: "29/08/2023",
    assignedTo: "Serrurerie Sécurité",
    cost: 180,
    description: "Serrure bloquée, impossible d'ouvrir la porte d'entrée. Intervention d'urgence nécessaire."
  },
  {
    id: 4,
    title: "Peinture chambre abîmée",
    property: "Loft - Bordeaux",
    tenant: "Lucas Moreau",
    status: "en cours",
    priority: "basse",
    type: "Peinture",
    dateCreated: "25/08/2023",
    assignedTo: "Déco & Peinture",
    description: "Trace d'humidité et écaillage de la peinture sur le mur de la chambre."
  },
  {
    id: 5,
    title: "Volets électriques bloqués",
    property: "Appartement T2 - Nantes",
    tenant: "Chloé Roux",
    status: "ouvert",
    priority: "moyenne",
    type: "Électricité",
    dateCreated: "03/09/2023",
    description: "Les volets électriques du salon restent bloqués en position fermée."
  }
];

// Données factices des prestataires
const providers = [
  {
    id: 1,
    name: "Plomberie Express",
    specialty: "Plomberie",
    contact: "06 12 34 56 78",
    email: "contact@plomberie-express.fr",
    rating: 4.8,
    address: "15 Rue des Artisans, 75011 Paris"
  },
  {
    id: 2,
    name: "Électricité Pro",
    specialty: "Électricité",
    contact: "06 23 45 67 89",
    email: "contact@electricite-pro.fr",
    rating: 4.5,
    address: "8 Avenue des Techniques, 69003 Lyon"
  },
  {
    id: 3,
    name: "Serrurerie Sécurité",
    specialty: "Serrurerie",
    contact: "06 34 56 78 90",
    email: "contact@serrurerie-securite.fr",
    rating: 4.9,
    address: "3 Rue du Cadenas, 06000 Nice"
  }
];

// Historique des interventions
const interventionHistory = [
  {
    id: 1,
    property: "Appartement T3 - Paris 9e",
    date: "15/08/2023",
    type: "Plomberie",
    description: "Remplacement chauffe-eau",
    cost: 650,
    provider: "Plomberie Express"
  },
  {
    id: 2,
    property: "Maison T4 - Nice",
    date: "29/08/2023",
    type: "Serrurerie",
    description: "Remplacement serrure porte d'entrée",
    cost: 180,
    provider: "Serrurerie Sécurité"
  },
  {
    id: 3,
    property: "Studio - Lyon 3e",
    date: "10/08/2023",
    type: "Électricité",
    description: "Révision tableau électrique",
    cost: 220,
    provider: "Électricité Pro"
  },
  {
    id: 4,
    property: "Appartement T2 - Nantes",
    date: "05/08/2023",
    type: "Plomberie",
    description: "Débouchage canalisation salle de bains",
    cost: 120,
    provider: "Plomberie Express"
  }
];

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [typeFilter, setTypeFilter] = useState("tous");

  // Filtrer les tickets selon la recherche et les filtres
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "tous" || ticket.status === statusFilter;
    const matchesType = typeFilter === "tous" || ticket.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Rendu des badges de statut
  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case "ouvert":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Ouvert</Badge>;
      case "en cours":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">En cours</Badge>;
      case "terminé":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Terminé</Badge>;
      case "annulé":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Rendu des badges de priorité
  const getPriorityBadge = (priority: TicketPriority) => {
    switch (priority) {
      case "urgente":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Urgente</Badge>;
      case "haute":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Haute</Badge>;
      case "moyenne":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Moyenne</Badge>;
      case "basse":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Basse</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Travaux & Maintenance</h1>
            <p className="text-muted-foreground">
              Gérez toutes les interventions et demandes de travaux
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Créer un ticket
          </Button>
        </div>

        {/* Stats de maintenance */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tickets ouverts</p>
                  <p className="text-3xl font-bold">{tickets.filter(t => t.status === "ouvert").length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En cours</p>
                  <p className="text-3xl font-bold">{tickets.filter(t => t.status === "en cours").length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Terminés (mois)</p>
                  <p className="text-3xl font-bold">{tickets.filter(t => t.status === "terminé").length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coût total (mois)</p>
                  <p className="text-3xl font-bold">1 170 €</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tickets">Tickets en cours</TabsTrigger>
            <TabsTrigger value="historique">Historique interventions</TabsTrigger>
            <TabsTrigger value="prestataires">Prestataires</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Rechercher un ticket par titre, bien ou locataire..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:w-1/4">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="ouvert">Ouvert</option>
                  <option value="en cours">En cours</option>
                  <option value="terminé">Terminé</option>
                </select>
              </div>
              <div className="md:w-1/4">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="tous">Tous les types</option>
                  <option value="Plomberie">Plomberie</option>
                  <option value="Électricité">Électricité</option>
                  <option value="Chauffage">Chauffage</option>
                  <option value="Serrurerie">Serrurerie</option>
                  <option value="Peinture">Peinture</option>
                </select>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Bien/Locataire</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Prestataire</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.title}</TableCell>
                          <TableCell>
                            <div>
                              <div>{ticket.property}</div>
                              <div className="text-sm text-muted-foreground">{ticket.tenant}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                          <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                          <TableCell>{ticket.dateCreated}</TableCell>
                          <TableCell>{ticket.assignedTo || "-"}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Détails</Button>
                              {ticket.status !== "terminé" && (
                                <Button variant="outline" size="sm">Assigner</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Aucun ticket ne correspond à votre recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Historique interventions */}
          <TabsContent value="historique" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bien</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Coût</TableHead>
                      <TableHead>Prestataire</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interventionHistory.map((intervention) => (
                      <TableRow key={intervention.id}>
                        <TableCell>{intervention.property}</TableCell>
                        <TableCell>{intervention.date}</TableCell>
                        <TableCell>{intervention.type}</TableCell>
                        <TableCell>{intervention.description}</TableCell>
                        <TableCell>{intervention.cost} €</TableCell>
                        <TableCell>{intervention.provider}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Voir facture</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Prestataires */}
          <TabsContent value="prestataires" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader>
                    <CardTitle>{provider.name}</CardTitle>
                    <CardDescription>{provider.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium w-20">Contact:</span>
                        <span>{provider.contact}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-20">Email:</span>
                        <span>{provider.email}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-20">Adresse:</span>
                        <span>{provider.address}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-20">Note:</span>
                        <span className="flex items-center">
                          {provider.rating}
                          <span className="text-yellow-500 ml-1">★</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm">Historique</Button>
                    <Button variant="outline" size="sm">Contacter</Button>
                  </div>
                </Card>
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-4">Ajouter un nouveau prestataire à votre réseau</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau prestataire
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Maintenance;
