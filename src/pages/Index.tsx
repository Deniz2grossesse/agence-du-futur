
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building, Home, Key, LineChart, UserCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample stats data that would normally come from an API
  const stats = [
    { title: "Nouvelles visites", value: "245", change: "+12.5%", icon: UserCheck },
    { title: "Biens actifs", value: "38", change: "+3.8%", icon: Building },
    { title: "Taux de conversion", value: "3.2%", change: "+0.4%", icon: LineChart },
    { title: "Locations en cours", value: "14", change: "+2", icon: Key },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue sur votre espace de gestion immobilier
            </p>
          </div>
          <Button asChild>
            <Link to="/properties">
              Voir tous les biens
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
                <div className="mt-4 flex items-center text-sm">
                  <span className="font-medium text-green-600">{stat.change}</span>
                  <span className="ml-2 text-muted-foreground">vs mois précédent</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity and Properties */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>
                Les dernières actions sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {i % 2 === 0 ? "Nouvelle demande de visite" : "Nouveau contrat signé"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i % 2 === 0 ? "Appartement T3 - Paris 9e" : "Studio - Lyon 3e"}
                      </p>
                      <p className="text-xs text-muted-foreground">Il y a {i + 1} heures</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Biens récents</CardTitle>
              <CardDescription>
                Les derniers biens ajoutés à votre portefeuille
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <Home className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {i % 2 === 0 ? "Appartement T3" : "Studio lumineux"}
                        </p>
                        <p className="text-sm font-bold">
                          {(i + 1) * 250 + 500} €/mois
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {i % 2 === 0 ? "Paris 9e, 68m²" : "Lyon 3e, 32m²"}
                      </p>
                      <div className="mt-1">
                        <span className="inline-block text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {i % 2 === 0 ? "Location" : "Colocation"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
