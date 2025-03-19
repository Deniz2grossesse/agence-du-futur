
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, DollarSign, RefreshCw, FileText, Building2 } from "lucide-react";
import { useState } from "react";

// Données factices pour les paiements
const rentPayments = [
  {
    id: 1,
    property: "Appartement T3 - Paris 9e",
    tenant: "Sophie Martin",
    amount: 1200,
    status: "payé",
    dueDate: "01/09/2023",
    paymentDate: "01/09/2023",
    paymentMethod: "Virement bancaire"
  },
  {
    id: 2,
    property: "Studio - Lyon 3e",
    tenant: "Thomas Dubois",
    amount: 750,
    status: "retard",
    dueDate: "01/09/2023",
    paymentDate: null,
    paymentMethod: null
  },
  {
    id: 3,
    property: "Maison T4 - Nice",
    tenant: "Emma Petit",
    amount: 1900,
    status: "payé",
    dueDate: "01/09/2023",
    paymentDate: "02/09/2023",
    paymentMethod: "Prélèvement automatique"
  },
  {
    id: 4,
    property: "Loft - Bordeaux",
    tenant: "Lucas Moreau",
    amount: 1500,
    status: "payé",
    dueDate: "01/09/2023",
    paymentDate: "31/08/2023",
    paymentMethod: "Virement bancaire"
  },
  {
    id: 5,
    property: "Appartement T2 - Nantes",
    tenant: "Chloé Roux",
    amount: 850,
    status: "retard",
    dueDate: "01/09/2023",
    paymentDate: null,
    paymentMethod: null
  }
];

const deposits = [
  {
    id: 1,
    tenant: "Sophie Martin",
    property: "Appartement T3 - Paris 9e",
    amount: 2400,
    status: "encaissé",
    date: "15/03/2023"
  },
  {
    id: 2,
    tenant: "Thomas Dubois",
    property: "Studio - Lyon 3e",
    amount: 1500,
    status: "encaissé",
    date: "10/08/2022"
  },
  {
    id: 3,
    tenant: "Emma Petit",
    property: "Maison T4 - Nice",
    amount: 3800,
    status: "encaissé",
    date: "01/06/2023"
  }
];

const ownerPayments = [
  {
    id: 1,
    owner: "Jean Dupont",
    amount: 2850,
    properties: 3,
    status: "effectué",
    date: "05/09/2023"
  },
  {
    id: 2,
    owner: "Marie Richard",
    amount: 1650,
    properties: 2,
    status: "en attente",
    date: "10/09/2023"
  }
];

const Payments = () => {
  const [activeTab, setActiveTab] = useState("loyers");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");

  // Filtrer les paiements de loyer
  const filteredRentPayments = rentPayments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "tous" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Rendu des badges de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "payé":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Payé</Badge>;
      case "retard":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">En retard</Badge>;
      case "à venir":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">À venir</Badge>;
      case "encaissé":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Encaissé</Badge>;
      case "à restituer":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">À restituer</Badge>;
      case "effectué":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Effectué</Badge>;
      case "en attente":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Paiements</h1>
            <p className="text-muted-foreground">
              Gérez tous les flux financiers de vos biens
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir
            </Button>
          </div>
        </div>

        {/* Stats des paiements */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Loyers encaissés (mois)</p>
                  <p className="text-3xl font-bold">6 200 €</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux d'impayés</p>
                  <p className="text-3xl font-bold">4,2%</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Versements propriétaires</p>
                  <p className="text-3xl font-bold">4 500 €</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="loyers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="loyers">Loyers perçus</TabsTrigger>
            <TabsTrigger value="depots">Dépôts de garantie</TabsTrigger>
            <TabsTrigger value="versements">Versements propriétaires</TabsTrigger>
            <TabsTrigger value="exports">Exports comptables</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyers" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Rechercher par locataire ou bien..."
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
                  <option value="payé">Payé</option>
                  <option value="retard">En retard</option>
                  <option value="à venir">À venir</option>
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
                      <TableHead>Bien</TableHead>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Date paiement</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRentPayments.length > 0 ? (
                      filteredRentPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.property}</TableCell>
                          <TableCell className="font-medium">{payment.tenant}</TableCell>
                          <TableCell>{payment.amount} €</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>{payment.paymentDate || "-"}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" disabled={payment.status !== "payé"}>
                                <FileText className="mr-2 h-4 w-4" />
                                Quittance
                              </Button>
                              {payment.status === "retard" && (
                                <Button variant="outline" size="sm">
                                  Relancer
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Aucun paiement ne correspond à votre recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Dépôts de garantie */}
          <TabsContent value="depots" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Bien</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deposits.map((deposit) => (
                      <TableRow key={deposit.id}>
                        <TableCell className="font-medium">{deposit.tenant}</TableCell>
                        <TableCell>{deposit.property}</TableCell>
                        <TableCell>{deposit.amount} €</TableCell>
                        <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                        <TableCell>{deposit.date}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Versements propriétaires */}
          <TabsContent value="versements" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Biens</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ownerPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.owner}</TableCell>
                        <TableCell>{payment.amount} €</TableCell>
                        <TableCell>{payment.properties}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Bordereau
                            </Button>
                            {payment.status === "en attente" && (
                              <Button variant="outline" size="sm">
                                Effectuer
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Exports comptables */}
          <TabsContent value="exports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exports comptables</CardTitle>
                <CardDescription>Générateur de rapports pour votre comptabilité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Période</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Septembre 2023</option>
                        <option>Août 2023</option>
                        <option>Juillet 2023</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type de rapport</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Rapport de loyers</option>
                        <option>Bordereaux propriétaires</option>
                        <option>Déclaration fiscale</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Format</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>PDF</option>
                        <option>CSV</option>
                        <option>Excel</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Générer le rapport
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Rapport de loyers - Août 2023</p>
                          <p className="text-sm text-muted-foreground">Généré le 05/09/2023</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rapports programmés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bordereaux propriétaires</p>
                        <p className="text-sm text-muted-foreground">Tous les 5 du mois</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rapport de loyers</p>
                        <p className="text-sm text-muted-foreground">Tous les 30 du mois</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Actif</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Gérer les rapports programmés</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Payments;
