
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Plus, MapPin, Bed, Bath, Maximize, Eye, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Sample properties data
const properties = [
  {
    id: 1,
    title: "Appartement T3 avec terrasse",
    address: "12 Rue de la Paix, 75001 Paris",
    price: 1250,
    type: "Appartement",
    bedrooms: 2,
    bathrooms: 1,
    surface: 68,
    status: "Disponible",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Studio lumineux proche métro",
    address: "5 Avenue Victor Hugo, 69003 Lyon",
    price: 590,
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    surface: 32,
    status: "Disponible",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    title: "Maison avec jardin",
    address: "8 Rue des Fleurs, 44000 Nantes",
    price: 1800,
    type: "Maison",
    bedrooms: 4,
    bathrooms: 2,
    surface: 120,
    status: "Disponible",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    title: "Appartement T2 rénové",
    address: "3 Rue Saint-Dominique, 13001 Marseille",
    price: 780,
    type: "Appartement",
    bedrooms: 1,
    bathrooms: 1,
    surface: 45,
    status: "Réservé",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 5,
    title: "Loft industriel rénové",
    address: "18 Quai des Chartrons, 33000 Bordeaux",
    price: 1500,
    type: "Loft",
    bedrooms: 2,
    bathrooms: 2,
    surface: 85,
    status: "Disponible",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 6,
    title: "Appartement T4 avec vue",
    address: "25 Boulevard Victor Hugo, 06000 Nice",
    price: 1350,
    type: "Appartement",
    bedrooms: 3,
    bathrooms: 2,
    surface: 90,
    status: "Disponible",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const Properties = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Biens immobiliers</h1>
            <p className="text-muted-foreground">
              Gérez et consultez tous vos biens immobiliers
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un bien
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="available">Disponibles</TabsTrigger>
              <TabsTrigger value="rented">Loués</TabsTrigger>
              <TabsTrigger value="reserved">Réservés</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="flex-1 sm:w-auto">
              <Input placeholder="Rechercher un bien..." />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type de bien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="apartment">Appartement</SelectItem>
                <SelectItem value="house">Maison</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className={view === "grid" 
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
            : "space-y-4"
          }>
            {properties.map((property) => (
              <Card key={property.id} className={view === "list" ? "overflow-hidden" : ""}>
                {view === "grid" ? (
                  <>
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={property.img} 
                        alt={property.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-black">
                        {property.status}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{property.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-bold">{property.price} €/mois</p>
                        <Badge variant="outline" className="flex items-center">
                          {property.type === "Appartement" ? (
                            <Building2 className="h-3 w-3 mr-1" />
                          ) : (
                            <Home className="h-3 w-3 mr-1" />
                          )}
                          {property.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} ch.
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} sdb.
                        </div>
                        <div className="flex items-center">
                          <Maximize className="h-4 w-4 mr-1" />
                          {property.surface} m²
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                      <Button variant="secondary" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </CardFooter>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48">
                      <img 
                        src={property.img} 
                        alt={property.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 left-2 bg-white text-black">
                        {property.status}
                      </Badge>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{property.title}</h3>
                          <p className="text-muted-foreground flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.address}
                          </p>
                        </div>
                        <p className="text-xl font-bold">{property.price} €/mois</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <Badge variant="outline" className="flex items-center">
                          {property.type === "Appartement" ? (
                            <Building2 className="h-3 w-3 mr-1" />
                          ) : (
                            <Home className="h-3 w-3 mr-1" />
                          )}
                          {property.type}
                        </Badge>
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} chambres
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} salle{property.bathrooms > 1 ? 's' : ''} de bain
                        </div>
                        <div className="flex items-center">
                          <Maximize className="h-4 w-4 mr-1" />
                          {property.surface} m²
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button variant="secondary" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </div>
    </Layout>
  );
};

export default Properties;
