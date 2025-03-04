
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, Home, MapPin, Euro, BarChart3, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Properties = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample data for properties
  const properties = [
    { id: 1, name: "Appartement T3", address: "21 Rue de la Paix, Paris 9e", type: "Apartment", status: "Available", price: 1200, area: 68 },
    { id: 2, name: "Studio lumineux", address: "45 Avenue des Fleurs, Lyon 3e", type: "Studio", status: "Rented", price: 750, area: 32 },
    { id: 3, name: "Villa Moderne", address: "8 Chemin des Oliviers, Nice", type: "House", status: "Available", price: 2100, area: 120 },
    { id: 4, name: "Loft industriel", address: "12 Rue des Artisans, Bordeaux", type: "Loft", status: "Pending", price: 1500, area: 85 },
    { id: 5, name: "Maison de ville", address: "3 Place du Marché, Toulouse", type: "House", status: "Available", price: 1800, area: 110 },
  ];

  // Sample data for chart
  const chartData = [
    { name: "Jan", available: 6, rented: 4, pending: 2 },
    { name: "Feb", available: 5, rented: 6, pending: 1 },
    { name: "Mar", available: 8, rented: 3, pending: 4 },
    { name: "Apr", available: 7, rented: 5, pending: 2 },
    { name: "May", available: 9, rented: 2, pending: 3 },
    { name: "Jun", available: 11, rented: 3, pending: 1 },
  ];

  // Sample stats data
  const stats = [
    { title: "Biens", value: "38", icon: Building, description: "Total properties" },
    { title: "Disponible", value: "24", icon: Home, description: "Available for rent" },
    { title: "Taux d'occupation", value: "76%", icon: BarChart3, description: "Occupancy rate" },
    { title: "Loyer moyen", value: "1280 €", icon: Euro, description: "Average rent" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Propriétés</h1>
            <p className="text-muted-foreground">
              Gérez votre portefeuille immobilier
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button>Ajouter une propriété</Button>
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
                <p className="mt-4 text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart and Listings */}
        <Tabs defaultValue="all" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tous les biens</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="rented">Loués</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu des propriétés</CardTitle>
                <CardDescription>
                  Distribution des propriétés par mois et par statut
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="available" stackId="a" fill="#4f46e5" name="Disponible" />
                      <Bar dataKey="rented" stackId="a" fill="#16a34a" name="Loué" />
                      <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="En attente" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liste des propriétés</CardTitle>
                <CardDescription>
                  Vue d'ensemble de votre portefeuille immobilier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Adresse</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Prix</TableHead>
                      <TableHead className="text-right">Surface</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.name}</TableCell>
                        <TableCell className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> 
                          {property.address}
                        </TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>
                          <Badge variant={
                            property.status === "Available" ? "outline" : 
                            property.status === "Rented" ? "success" : 
                            "warning"
                          }>
                            {property.status === "Available" ? "Disponible" : 
                             property.status === "Rented" ? "Loué" : 
                             "En attente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{property.price} €/mois</TableCell>
                        <TableCell className="text-right">{property.area} m²</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propriétés disponibles</CardTitle>
                <CardDescription>
                  Tous les biens actuellement disponibles à la location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Adresse</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Prix</TableHead>
                      <TableHead className="text-right">Surface</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties
                      .filter((property) => property.status === "Available")
                      .map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.name}</TableCell>
                          <TableCell className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> 
                            {property.address}
                          </TableCell>
                          <TableCell>{property.type}</TableCell>
                          <TableCell className="text-right">{property.price} €/mois</TableCell>
                          <TableCell className="text-right">{property.area} m²</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rented" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propriétés louées</CardTitle>
                <CardDescription>
                  Tous les biens actuellement en location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Adresse</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Prix</TableHead>
                      <TableHead className="text-right">Surface</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties
                      .filter((property) => property.status === "Rented")
                      .map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.name}</TableCell>
                          <TableCell className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> 
                            {property.address}
                          </TableCell>
                          <TableCell>{property.type}</TableCell>
                          <TableCell className="text-right">{property.price} €/mois</TableCell>
                          <TableCell className="text-right">{property.area} m²</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propriétés en attente</CardTitle>
                <CardDescription>
                  Tous les biens en cours de traitement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Adresse</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Prix</TableHead>
                      <TableHead className="text-right">Surface</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties
                      .filter((property) => property.status === "Pending")
                      .map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">{property.name}</TableCell>
                          <TableCell className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> 
                            {property.address}
                          </TableCell>
                          <TableCell>{property.type}</TableCell>
                          <TableCell className="text-right">{property.price} €/mois</TableCell>
                          <TableCell className="text-right">{property.area} m²</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Properties;
