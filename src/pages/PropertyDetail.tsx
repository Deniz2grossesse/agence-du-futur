
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building, MapPin, Euro, BedDouble, Bath, Ruler, 
  Calendar, FileText, Wrench, User, Phone, Mail,
  Pencil, FileUp, Plus, Download, Eye
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  // Exemple de données pour un bien
  const property = {
    id: Number(id),
    title: "Appartement T3 lumineux",
    address: "21 Rue de la Paix",
    city: "Paris",
    zipCode: "75009",
    price: 1200,
    surface: 68,
    rooms: 3,
    bathrooms: 1,
    type: "apartment",
    status: "rented",
    description: "Bel appartement de 3 pièces entièrement rénové, situé dans un immeuble haussmannien avec ascenseur. Proche de toutes commodités, transports et commerces. Exposition sud, très lumineux.",
    features: ["Balcon", "Vue dégagée", "Parquet", "Cuisine équipée", "Double vitrage", "Interphone", "Cave", "Ascenseur"],
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    createdAt: "2023-09-15",
    tenant: "Marie Dupont",
    owner: {
      name: "Jean Martin",
      email: "jean.martin@example.com",
      phone: "+33 6 12 34 56 78"
    }
  };

  // Exemple de données pour les paiements
  const payments = [
    { id: 1, date: "2023-12-01", amount: 1200, status: "paid", type: "rent", reference: "LOC-1201-2023" },
    { id: 2, date: "2023-11-01", amount: 1200, status: "paid", type: "rent", reference: "LOC-1101-2023" },
    { id: 3, date: "2023-10-01", amount: 1200, status: "paid", type: "rent", reference: "LOC-1001-2023" },
    { id: 4, date: "2023-09-01", amount: 1200, status: "paid", type: "rent", reference: "LOC-0901-2023" },
  ];

  // Exemple de données pour les travaux
  const maintenanceTickets = [
    { id: 1, date: "2023-12-10", title: "Problème de chauffage", status: "pending", priority: "high" },
    { id: 2, date: "2023-11-15", title: "Fuite robinet salle de bain", status: "completed", priority: "medium" },
    { id: 3, date: "2023-10-05", title: "Serrure porte d'entrée", status: "completed", priority: "high" },
  ];

  // Exemple de données pour les documents
  const documents = [
    { id: 1, name: "Contrat de bail", type: "pdf", size: "1.2 MB", date: "2023-09-01" },
    { id: 2, name: "État des lieux", type: "pdf", size: "3.5 MB", date: "2023-09-01" },
    { id: 3, name: "Quittance Décembre 2023", type: "pdf", size: "0.8 MB", date: "2023-12-05" },
    { id: 4, name: "Quittance Novembre 2023", type: "pdf", size: "0.8 MB", date: "2023-11-05" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50 border-red-200">Vacant</Badge>;
      case "rented":
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200">Loué</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">En cours</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200">Payé</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">En attente</Badge>;
      case "late":
        return <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50 border-red-200">En retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTicketStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200">Terminé</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">En cours</Badge>;
      case "new":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200">Nouveau</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTicketPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50 border-red-200">Haute</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Moyenne</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200">Faible</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with property title and actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address}, {property.zipCode} {property.city}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => navigate(`/edit-property/${id}`)}>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => navigate(`/create-lease/${id}`)}>
              <FileUp className="mr-2 h-4 w-4" />
              Générer bail
            </Button>
            <Button variant="purple" className="rounded-xl" onClick={() => navigate(`/create-maintenance-ticket/${id}`)}>
              <Wrench className="mr-2 h-4 w-4" />
              Créer ticket
            </Button>
          </div>
        </div>

        {/* Property details in 2 columns */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left column: Property details and owner */}
          <div className="space-y-6">
            {/* Property image */}
            <Card className="rounded-2xl overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={property.imageUrl} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(property.status)}
                </div>
              </div>
            </Card>

            {/* Property details */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Loyer</p>
                      <p className="font-bold">{property.price} €/mois</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Surface</p>
                      <p className="font-bold">{property.surface} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BedDouble className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pièces</p>
                      <p className="font-bold">{property.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Salles de bain</p>
                      <p className="font-bold">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-bold">
                        {property.type === "apartment" ? "Appartement" : 
                         property.type === "house" ? "Maison" : 
                         property.type === "studio" ? "Studio" : 
                         property.type === "commercial" ? "Local commercial" : 
                         property.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date d'ajout</p>
                      <p className="font-bold">{new Date(property.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p>{property.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Caractéristiques</p>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner information */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Propriétaire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="font-bold">{property.owner.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-bold">{property.owner.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-bold">{property.owner.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Tabs for payments, maintenance, documents */}
          <div>
            <Card className="rounded-2xl">
              <CardHeader className="border-b">
                <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="payments">Paiements</TabsTrigger>
                    <TabsTrigger value="maintenance">Travaux</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                {/* Payments Tab */}
                <TabsContent value="payments" className="m-0">
                  <div className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Référence</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                            <TableCell>{payment.reference}</TableCell>
                            <TableCell>{payment.amount} €</TableCell>
                            <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un paiement
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Maintenance Tab */}
                <TabsContent value="maintenance" className="m-0">
                  <div className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead>Priorité</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {maintenanceTickets.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell>{new Date(ticket.date).toLocaleDateString()}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{getTicketPriorityBadge(ticket.priority)}</TableCell>
                            <TableCell>{getTicketStatusBadge(ticket.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="rounded-xl">
                        <Wrench className="mr-2 h-4 w-4" />
                        Créer un ticket
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="m-0">
                  <div className="p-6">
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-gray-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {doc.type.toUpperCase()} · {doc.size} · {new Date(doc.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Voir</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Télécharger</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un document
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>

            {/* Tenant information */}
            {property.status === "rented" && property.tenant && (
              <Card className="rounded-2xl mt-6">
                <CardHeader>
                  <CardTitle>Locataire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Nom</p>
                      <p className="font-bold">{property.tenant}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" className="rounded-xl">
                      <Eye className="mr-2 h-4 w-4" />
                      Voir profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
