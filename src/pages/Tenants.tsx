
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, UserPlus, Mail, Phone, 
  Home, Clock, Eye, Send, FileText
} from "lucide-react";
import TenantDetail from "@/components/tenants/TenantDetail";

// Données factices pour les locataires
const tenants = [
  {
    id: 1,
    name: "Sophie Martin",
    property: "Appartement T3 - Paris 9e",
    status: "en place",
    rent: 1200,
    phone: "06 12 34 56 78",
    email: "sophie.martin@example.com",
    moveInDate: "15/03/2023",
    lastPayment: "01/09/2023",
    personalInfo: {
      age: 34,
      job: "Ingénieure informatique",
      income: "3800€/mois",
      guarantor: "Caution bancaire",
      identityDoc: "Carte d'identité valide jusqu'au 12/05/2028"
    },
    payments: [
      { id: 1, date: "01/09/2023", amount: 1200, status: "payé", method: "Virement" },
      { id: 2, date: "01/08/2023", amount: 1200, status: "payé", method: "Virement" },
      { id: 3, date: "01/07/2023", amount: 1200, status: "payé", method: "Virement" },
      { id: 4, date: "01/06/2023", amount: 1200, status: "retard", method: "Chèque" },
      { id: 5, date: "01/05/2023", amount: 1200, status: "payé", method: "Virement" }
    ],
    tickets: [
      { id: 1, date: "15/07/2023", title: "Problème de chauffage", status: "résolu" },
      { id: 2, date: "02/05/2023", title: "Fuite robinet cuisine", status: "résolu" }
    ],
    documents: [
      { id: 1, name: "Contrat de bail", type: "pdf", signed: true, date: "15/03/2023" },
      { id: 2, name: "État des lieux entrée", type: "pdf", signed: true, date: "15/03/2023" },
      { id: 3, name: "Assurance habitation", type: "pdf", signed: true, date: "20/03/2023" },
      { id: 4, name: "Quittance Août 2023", type: "pdf", signed: false, date: "01/08/2023" }
    ]
  },
  {
    id: 2,
    name: "Thomas Dubois",
    property: "Studio - Lyon 3e",
    status: "préavis",
    rent: 750,
    phone: "06 23 45 67 89",
    email: "thomas.dubois@example.com",
    moveInDate: "10/08/2022",
    lastPayment: "28/08/2023",
    personalInfo: {
      age: 27,
      job: "Designer freelance",
      income: "2600€/mois",
      guarantor: "Parents",
      identityDoc: "Passeport valide jusqu'au 18/11/2026"
    },
    payments: [
      { id: 1, date: "28/08/2023", amount: 750, status: "payé", method: "Virement" },
      { id: 2, date: "30/07/2023", amount: 750, status: "payé", method: "Virement" },
      { id: 3, date: "02/07/2023", amount: 750, status: "retard", method: "Espèces" }
    ],
    tickets: [
      { id: 1, date: "22/06/2023", title: "Volet roulant bloqué", status: "résolu" }
    ],
    documents: [
      { id: 1, name: "Contrat de bail", type: "pdf", signed: true, date: "10/08/2022" },
      { id: 2, name: "État des lieux entrée", type: "pdf", signed: true, date: "10/08/2022" },
      { id: 3, name: "Préavis de départ", type: "pdf", signed: true, date: "15/08/2023" },
      { id: 4, name: "Quittance Août 2023", type: "pdf", signed: true, date: "30/08/2023" }
    ]
  },
  {
    id: 3,
    name: "Emma Petit",
    property: "Maison T4 - Nice",
    status: "en place",
    rent: 1900,
    phone: "06 34 56 78 90",
    email: "emma.petit@example.com",
    moveInDate: "01/06/2023",
    lastPayment: "02/09/2023",
    personalInfo: {
      age: 42,
      job: "Médecin",
      income: "5500€/mois",
      guarantor: "Aucun",
      identityDoc: "Carte d'identité valide jusqu'au 05/12/2025"
    },
    payments: [
      { id: 1, date: "02/09/2023", amount: 1900, status: "payé", method: "Virement" },
      { id: 2, date: "01/08/2023", amount: 1900, status: "payé", method: "Virement" },
      { id: 3, date: "01/07/2023", amount: 1900, status: "payé", method: "Virement" },
      { id: 4, date: "01/06/2023", amount: 1900, status: "payé", method: "Virement" }
    ],
    tickets: [],
    documents: [
      { id: 1, name: "Contrat de bail", type: "pdf", signed: true, date: "01/06/2023" },
      { id: 2, name: "État des lieux entrée", type: "pdf", signed: true, date: "01/06/2023" },
      { id: 3, name: "Assurance habitation", type: "pdf", signed: true, date: "05/06/2023" }
    ]
  },
  {
    id: 4,
    name: "Lucas Moreau",
    property: "Loft - Bordeaux",
    status: "en place",
    rent: 1500,
    phone: "06 45 67 89 01",
    email: "lucas.moreau@example.com", 
    moveInDate: "20/01/2023",
    lastPayment: "31/08/2023",
    personalInfo: {
      age: 38,
      job: "Architecte",
      income: "4200€/mois",
      guarantor: "Aucun",
      identityDoc: "Carte d'identité valide jusqu'au 14/03/2027"
    },
    payments: [
      { id: 1, date: "31/08/2023", amount: 1500, status: "payé", method: "Virement" },
      { id: 2, date: "01/08/2023", amount: 1500, status: "payé", method: "Virement" }
    ],
    tickets: [
      { id: 1, date: "10/06/2023", title: "Problème électrique", status: "en cours" },
      { id: 2, date: "05/03/2023", title: "Peinture écaillée", status: "résolu" }
    ],
    documents: [
      { id: 1, name: "Contrat de bail", type: "pdf", signed: true, date: "20/01/2023" },
      { id: 2, name: "État des lieux entrée", type: "pdf", signed: true, date: "20/01/2023" }
    ]
  },
  {
    id: 5,
    name: "Chloé Roux",
    property: "Appartement T2 - Nantes",
    status: "préavis",
    rent: 850,
    phone: "06 56 78 90 12",
    email: "chloe.roux@example.com",
    moveInDate: "05/05/2022",
    lastPayment: "25/08/2023",
    personalInfo: {
      age: 31,
      job: "Professeure",
      income: "2300€/mois",
      guarantor: "Parents",
      identityDoc: "Passeport valide jusqu'au 22/07/2028"
    },
    payments: [
      { id: 1, date: "25/08/2023", amount: 850, status: "payé", method: "Virement" },
      { id: 2, date: "29/07/2023", amount: 850, status: "payé", method: "Chèque" }
    ],
    tickets: [
      { id: 1, date: "17/08/2023", title: "Problème de serrure", status: "résolu" }
    ],
    documents: [
      { id: 1, name: "Contrat de bail", type: "pdf", signed: true, date: "05/05/2022" },
      { id: 2, name: "État des lieux entrée", type: "pdf", signed: true, date: "05/05/2022" },
      { id: 3, name: "Préavis de départ", type: "pdf", signed: true, date: "10/08/2023" }
    ]
  }
];

const Tenants = () => {
  const [activeTab, setActiveTab] = useState("liste");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  // Filtrer les locataires selon la recherche et le filtre de statut
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tenant.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "tous" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Fonctions pour gérer les actions
  const handleViewDetails = (tenant: any) => {
    setSelectedTenant(tenant);
    setActiveTab("detail");
  };

  const handlePaymentReminder = (tenant: any) => {
    // Dans une application réelle, ceci ouvrirait une modale
    // ou naviguerait vers un formulaire de message
    alert(`Relance de paiement pour ${tenant.name}`);
  };

  // Rendu des badges de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en place":
        return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">En place</Badge>;
      case "préavis":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">Préavis</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Locataires</h1>
            <p className="text-muted-foreground">
              Gérez tous vos locataires et leurs contrats
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un locataire
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="liste">Liste des locataires</TabsTrigger>
            <TabsTrigger value="detail" disabled={!selectedTenant}>Détail locataire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="liste" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Rechercher un locataire par nom ou bien..."
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
                  <option value="en place">En place</option>
                  <option value="préavis">En préavis</option>
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
                      <TableHead>Nom</TableHead>
                      <TableHead>Bien</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Loyer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTenants.length > 0 ? (
                      filteredTenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell className="font-medium">{tenant.name}</TableCell>
                          <TableCell>{tenant.property}</TableCell>
                          <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                          <TableCell>{tenant.rent} €/mois</TableCell>
                          <TableCell className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewDetails(tenant)}
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                Voir
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePaymentReminder(tenant)}
                              >
                                <Send className="mr-1 h-4 w-4" />
                                Relancer
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Aucun locataire ne correspond à votre recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Stats sur les locataires */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total locataires</p>
                      <p className="text-3xl font-bold">{tenants.length}</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <UserPlus className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Locataires en place</p>
                      <p className="text-3xl font-bold">{tenants.filter(t => t.status === "en place").length}</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Préavis en cours</p>
                      <p className="text-3xl font-bold">{tenants.filter(t => t.status === "préavis").length}</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detail">
            {selectedTenant && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Détail de {selectedTenant.name}
                    <span className="ml-2">
                      {getStatusBadge(selectedTenant.status)}
                    </span>
                  </h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("liste")}
                  >
                    Retour à la liste
                  </Button>
                </div>
                
                <TenantDetail tenant={selectedTenant} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tenants;
