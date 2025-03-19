
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, UserPlus, Building2, Mail, Phone, BarChart, FileText, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";

// Types pour les propriétaires
interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
  properties: number;
  revenue: number;
  status: "actif" | "inactif";
  dateJoined: string;
  type: "particulier" | "société" | "sci";
  address: string;
  taxNumber?: string;
  bankInfo: string;
  fees: number;
}

// Données factices pour les propriétaires
const owners: Owner[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    properties: 3,
    revenue: 3650,
    status: "actif",
    dateJoined: "15/01/2021",
    type: "particulier",
    address: "25 Rue du Commerce, 75015 Paris",
    taxNumber: "FR12345678901",
    bankInfo: "IBAN: FR76 1234 5678 9012 3456 7890 123",
    fees: 8
  },
  {
    id: 2,
    name: "Marie Richard",
    email: "marie.richard@example.com",
    phone: "06 23 45 67 89",
    properties: 2,
    revenue: 1650,
    status: "actif",
    dateJoined: "05/03/2022",
    type: "particulier",
    address: "8 Rue de la Paix, 75002 Paris",
    taxNumber: "FR98765432109",
    bankInfo: "IBAN: FR76 9876 5432 1098 7654 3210 987",
    fees: 7.5
  },
  {
    id: 3,
    name: "SCI Immobilière du Sud",
    email: "contact@sci-sud.fr",
    phone: "04 91 23 45 67",
    properties: 5,
    revenue: 5800,
    status: "actif",
    dateJoined: "10/07/2020",
    type: "sci",
    address: "15 Boulevard Longchamp, 13001 Marseille",
    taxNumber: "FR45678901234",
    bankInfo: "IBAN: FR76 4567 8901 2345 6789 0123 456",
    fees: 6.5
  },
  {
    id: 4,
    name: "Pierre Martin",
    email: "pierre.martin@example.com",
    phone: "06 34 56 78 90",
    properties: 1,
    revenue: 950,
    status: "inactif",
    dateJoined: "20/11/2022",
    type: "particulier",
    address: "3 Avenue Victor Hugo, 33000 Bordeaux",
    taxNumber: "FR32109876543",
    bankInfo: "IBAN: FR76 3210 9876 5432 1098 7654 321",
    fees: 8
  }
];

// Données factices pour les biens par propriétaire
const propertiesByOwner = [
  {
    id: 1,
    ownerId: 1,
    name: "Appartement T3 - Paris 9e",
    address: "21 Rue de la Paix, 75009 Paris",
    type: "apartment",
    surface: 68,
    tenant: "Sophie Martin",
    rent: 1200,
    status: "loué"
  },
  {
    id: 2,
    ownerId: 1,
    name: "Maison T4 - Nice",
    address: "8 Chemin des Oliviers, 06000 Nice",
    type: "house",
    surface: 120,
    tenant: "Emma Petit",
    rent: 1900,
    status: "loué"
  },
  {
    id: 3,
    ownerId: 1,
    name: "Studio - Marseille",
    address: "12 Rue du Port, 13002 Marseille",
    type: "studio",
    surface: 30,
    tenant: null,
    rent: 550,
    status: "vacant"
  },
  {
    id: 4,
    ownerId: 2,
    name: "Loft - Bordeaux",
    address: "12 Rue des Artisans, 33000 Bordeaux",
    type: "apartment",
    surface: 85,
    tenant: "Lucas Moreau",
    rent: 1500,
    status: "loué"
  },
  {
    id: 5,
    ownerId: 2,
    name: "Appartement T2 - Nantes",
    address: "17 Boulevard Saint-Michel, 44000 Nantes",
    type: "apartment",
    surface: 45,
    tenant: "Chloé Roux",
    rent: 850,
    status: "loué"
  }
];

// Données factices pour les versements aux propriétaires
const ownerPayments = [
  {
    id: 1,
    ownerId: 1,
    date: "05/09/2023",
    amount: 2850,
    period: "Août 2023",
    status: "effectué"
  },
  {
    id: 2,
    ownerId: 1,
    date: "05/08/2023",
    amount: 2850,
    period: "Juillet 2023",
    status: "effectué"
  },
  {
    id: 3,
    ownerId: 1,
    date: "05/07/2023",
    amount: 2850,
    period: "Juin 2023",
    status: "effectué"
  },
  {
    id: 4,
    ownerId: 2,
    date: "10/09/2023",
    amount: 1650,
    period: "Août 2023",
    status: "en attente"
  },
  {
    id: 5,
    ownerId: 2,
    date: "10/08/2023",
    amount: 1650,
    period: "Juillet 2023",
    status: "effectué"
  }
];

const Owners = () => {
  const [activeTab, setActiveTab] = useState("liste");
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");

  // Filtrer les propriétaires selon la recherche et le filtre de statut
  const filteredOwners = owners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          owner.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "tous" || owner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Obtenir les biens pour un propriétaire spécifique
  const getOwnerProperties = (ownerId: number) => {
    return propertiesByOwner.filter(property => property.ownerId === ownerId);
  };

  // Obtenir les versements pour un propriétaire spécifique
  const getOwnerPayments = (ownerId: number) => {
    return ownerPayments.filter(payment => payment.ownerId === ownerId);
  };

  // Rendu des badges de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Actif</Badge>;
      case "inactif":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Inactif</Badge>;
      case "loué":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Loué</Badge>;
      case "vacant":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Vacant</Badge>;
      case "effectué":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Effectué</Badge>;
      case "en attente":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Gestionnaire pour ouvrir les détails d'un propriétaire
  const handleViewOwnerDetails = (owner: Owner) => {
    setSelectedOwner(owner);
    setActiveTab("detail");
  };

  // Gestionnaire pour revenir à la liste
  const handleBackToList = () => {
    setSelectedOwner(null);
    setActiveTab("liste");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Propriétaires</h1>
            <p className="text-muted-foreground">
              Gérez tous vos propriétaires et leurs biens
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un propriétaire
          </Button>
        </div>

        {/* Stats sur les propriétaires */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Propriétaires</p>
                  <p className="text-3xl font-bold">{owners.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Biens gérés</p>
                  <p className="text-3xl font-bold">{propertiesByOwner.length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Loyers générés</p>
                  <p className="text-3xl font-bold">12 050 €</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Honoraires moyens</p>
                  <p className="text-3xl font-bold">7.5%</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="liste" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="liste">Liste des propriétaires</TabsTrigger>
            <TabsTrigger value="detail" disabled={!selectedOwner}>Détail propriétaire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="liste" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Rechercher un propriétaire par nom ou email..."
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
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
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
                      <TableHead>Type</TableHead>
                      <TableHead>Biens</TableHead>
                      <TableHead>Revenus mensuels</TableHead>
                      <TableHead>Honoraires</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOwners.length > 0 ? (
                      filteredOwners.map((owner) => (
                        <TableRow key={owner.id}>
                          <TableCell className="font-medium">{owner.name}</TableCell>
                          <TableCell>{owner.type}</TableCell>
                          <TableCell>{owner.properties}</TableCell>
                          <TableCell>{owner.revenue} €</TableCell>
                          <TableCell>{owner.fees}%</TableCell>
                          <TableCell>{getStatusBadge(owner.status)}</TableCell>
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
                              <Button variant="outline" size="sm" onClick={() => handleViewOwnerDetails(owner)}>
                                Détails
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          Aucun propriétaire ne correspond à votre recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detail" className="space-y-6">
            {selectedOwner && (
              <>
                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={handleBackToList}>
                    Retour à la liste
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Contacter
                    </Button>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Générer rapport
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {selectedOwner.name}
                        {getStatusBadge(selectedOwner.status)}
                      </CardTitle>
                      <CardDescription>
                        Propriétaire depuis le {selectedOwner.dateJoined}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Type</p>
                            <p>{selectedOwner.type}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Numéro fiscal</p>
                            <p>{selectedOwner.taxNumber || "Non renseigné"}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                          <p>{selectedOwner.address}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p>{selectedOwner.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                            <p>{selectedOwner.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Coordonnées bancaires</p>
                          <p>{selectedOwner.bankInfo}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Honoraires</p>
                            <p>{selectedOwner.fees}% des loyers</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Revenus mensuels</p>
                            <p>{selectedOwner.revenue} €</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold">{selectedOwner.properties}</span>
                          <span className="text-sm text-muted-foreground">Biens gérés</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold">{selectedOwner.revenue} €</span>
                          <span className="text-sm text-muted-foreground">Revenus mensuels</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold">{selectedOwner.revenue * 12} €</span>
                          <span className="text-sm text-muted-foreground">Revenus annuels estimés</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold">{Math.round(selectedOwner.revenue * selectedOwner.fees / 100)} €</span>
                          <span className="text-sm text-muted-foreground">Honoraires mensuels</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Biens confiés</CardTitle>
                    <CardDescription>
                      Liste des biens gérés pour ce propriétaire
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bien</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Surface</TableHead>
                          <TableHead>Loyer</TableHead>
                          <TableHead>Locataire</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getOwnerProperties(selectedOwner.id).map((property) => (
                          <TableRow key={property.id}>
                            <TableCell className="font-medium">
                              {property.name}
                              <div className="text-xs text-muted-foreground">{property.address}</div>
                            </TableCell>
                            <TableCell>{property.type}</TableCell>
                            <TableCell>{property.surface} m²</TableCell>
                            <TableCell>{property.rent} €</TableCell>
                            <TableCell>{property.tenant || "-"}</TableCell>
                            <TableCell>{getStatusBadge(property.status)}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Détails</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Versements effectués</CardTitle>
                    <CardDescription>
                      Historique des versements au propriétaire
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Période</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getOwnerPayments(selectedOwner.id).map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.period}</TableCell>
                            <TableCell>{payment.amount} €</TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Bordereau
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Documents associés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <p className="font-medium">Mandat de gestion</p>
                            <p className="text-xs text-muted-foreground">Signé le 15/01/2021</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <p className="font-medium">Rapport fiscal annuel 2022</p>
                            <p className="text-xs text-muted-foreground">Généré le 15/01/2023</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <p className="font-medium">Relevé de compte propriétaire</p>
                            <p className="text-xs text-muted-foreground">Période: Jan-Juin 2023</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center">
                  <Button variant="outline" className="mr-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    Rapport annuel
                  </Button>
                  <Button variant="default">
                    <BarChart className="mr-2 h-4 w-4" />
                    Générer rapport fiscal
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Owners;
