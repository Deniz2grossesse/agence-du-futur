
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter, MapPin, Euro, BedDouble, Bath, Ruler, Building, ArrowUpDown, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Types pour les biens locatifs
interface RentalProperty {
  id: number;
  title: string;
  address: string;
  city: string;
  zipCode: string;
  price: number;
  surface: number;
  rooms: number;
  bathrooms: number;
  type: "apartment" | "house" | "studio" | "commercial";
  status: "available" | "rented" | "pending";
  description: string;
  features: string[];
  imageUrl: string;
  createdAt: string;
}

const RentalProperties = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Données d'exemple pour les biens locatifs
  const rentalProperties: RentalProperty[] = [
    {
      id: 1,
      title: "Appartement T3 lumineux",
      address: "21 Rue de la Paix",
      city: "Paris",
      zipCode: "75009",
      price: 1200,
      surface: 68,
      rooms: 3,
      bathrooms: 1,
      type: "apartment",
      status: "available",
      description: "Bel appartement de 3 pièces entièrement rénové, situé dans un immeuble haussmannien avec ascenseur.",
      features: ["Balcon", "Vue dégagée", "Parquet", "Cuisine équipée"],
      imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      createdAt: "2023-09-15"
    },
    {
      id: 2,
      title: "Studio meublé",
      address: "45 Avenue des Fleurs",
      city: "Lyon",
      zipCode: "69003",
      price: 750,
      surface: 32,
      rooms: 1,
      bathrooms: 1,
      type: "studio",
      status: "rented",
      description: "Studio entièrement meublé au centre-ville, idéal pour étudiant.",
      features: ["Meublé", "Interphone", "Cave", "Proche transports"],
      imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      createdAt: "2023-10-05"
    },
    {
      id: 3,
      title: "Maison familiale avec jardin",
      address: "8 Chemin des Oliviers",
      city: "Nice",
      zipCode: "06000",
      price: 1900,
      surface: 120,
      rooms: 4,
      bathrooms: 2,
      type: "house",
      status: "available",
      description: "Maison de 4 pièces avec jardin et terrasse, quartier calme et résidentiel.",
      features: ["Jardin", "Garage", "Terrasse", "Climatisation"],
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      createdAt: "2023-08-20"
    },
    {
      id: 4,
      title: "Loft industriel",
      address: "12 Rue des Artisans",
      city: "Bordeaux",
      zipCode: "33000",
      price: 1500,
      surface: 85,
      rooms: 2,
      bathrooms: 1,
      type: "apartment",
      status: "pending",
      description: "Magnifique loft industriel, beaux volumes, dans ancien atelier réhabilité.",
      features: ["Hauteur sous plafond", "Verrière", "Parking", "Ascenseur"],
      imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
      createdAt: "2023-11-10"
    },
    {
      id: 5,
      title: "Local commercial",
      address: "3 Place du Marché",
      city: "Toulouse",
      zipCode: "31000",
      price: 2200,
      surface: 110,
      rooms: 3,
      bathrooms: 1,
      type: "commercial",
      status: "available",
      description: "Local commercial idéalement situé en centre-ville, grande vitrine.",
      features: ["Vitrine", "Cave", "Alarme", "Climatisation"],
      imageUrl: "https://images.unsplash.com/photo-1582037928769-49d01261cff4?auto=format&fit=crop&w=800&q=80",
      createdAt: "2023-07-15"
    },
    {
      id: 6,
      title: "Appartement T2 avec balcon",
      address: "17 Boulevard Saint-Michel",
      city: "Nantes",
      zipCode: "44000",
      price: 850,
      surface: 45,
      rooms: 2,
      bathrooms: 1,
      type: "apartment",
      status: "available",
      description: "Appartement de 2 pièces avec balcon filant, vue sur jardin.",
      features: ["Balcon", "Double vitrage", "Interphone", "Ascenseur"],
      imageUrl: "https://images.unsplash.com/photo-1596204976717-1a9ff47f74d2?auto=format&fit=crop&w=800&q=80",
      createdAt: "2023-12-05"
    },
  ];

  const formMethods = useForm({
    defaultValues: {
      type: "",
      minPrice: "",
      maxPrice: "",
      minRooms: "",
      minSurface: "",
      city: ""
    }
  });

  // Filtrage des biens selon l'onglet actif
  const filteredProperties = rentalProperties
    .filter(property => {
      if (activeTab === "all") return true;
      return property.status === activeTab;
    })
    .filter(property => 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Statistiques pour les biens
  const stats = [
    { title: "Total", value: rentalProperties.length, icon: Building },
    { title: "Disponibles", value: rentalProperties.filter(p => p.status === "available").length, icon: Building },
    { title: "Loués", value: rentalProperties.filter(p => p.status === "rented").length, icon: Building },
    { title: "En cours", value: rentalProperties.filter(p => p.status === "pending").length, icon: Building },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Disponible</Badge>;
      case "rented":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Loué</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">En cours</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleResetFilters = () => {
    formMethods.reset();
    setShowFilters(false);
  };

  const onSubmitFilters = (data: any) => {
    console.log("Filtres appliqués:", data);
    setShowFilters(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Biens Locatifs</h1>
            <p className="text-muted-foreground">
              Gérez et suivez tous vos biens locatifs
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Button onClick={() => navigate("/add-property")}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un bien
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtres */}
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filtres avancés</CardTitle>
              <CardDescription>Affinez votre recherche de biens</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmitFilters)} className="grid gap-6 md:grid-cols-3">
                  <FormField
                    control={formMethods.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de bien</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                            {...field}
                          >
                            <option value="">Tous les types</option>
                            <option value="apartment">Appartement</option>
                            <option value="house">Maison</option>
                            <option value="studio">Studio</option>
                            <option value="commercial">Local commercial</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formMethods.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Toutes les villes" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formMethods.control}
                    name="minPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix minimum (€)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Min" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formMethods.control}
                    name="maxPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix maximum (€)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Max" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formMethods.control}
                    name="minRooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pièces minimum</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Min" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formMethods.control}
                    name="minSurface"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surface minimum (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Min" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetFilters}>Réinitialiser</Button>
              <Button onClick={formMethods.handleSubmit(onSubmitFilters)}>Appliquer les filtres</Button>
            </CardFooter>
          </Card>
        )}

        {/* Search */}
        <div className="flex mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Rechercher un bien par titre, adresse ou ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Properties Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="rented">Loués</TabsTrigger>
            <TabsTrigger value="pending">En cours</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {/* Sort Options */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Trier par prix
              </Button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img 
                      src={property.imageUrl} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {getStatusBadge(property.status)}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl">{property.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address}, {property.zipCode} {property.city}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Euro className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-bold">{property.price} €/mois</span>
                      </div>
                      <div className="flex items-center">
                        <Ruler className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{property.surface} m²</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{property.rooms} pièce{property.rooms > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{property.bathrooms} SdB</span>
                      </div>
                    </div>

                    <div className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                      {property.description}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs font-normal">
                          {feature}
                        </Badge>
                      ))}
                      {property.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          +{property.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t flex justify-between">
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Ajouté le {new Date(property.createdAt).toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun bien ne correspond à votre recherche</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Réinitialiser la recherche
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RentalProperties;
