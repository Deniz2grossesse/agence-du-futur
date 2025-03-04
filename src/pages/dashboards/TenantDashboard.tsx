
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Home, FileText, Calendar, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TenantDashboard = () => {
  // Exemple d'applications pour un locataire
  const applications = [
    { id: 1, address: "123 Rue de Paris", status: "Accepté", date: "15/04/2023" },
    { id: 2, address: "45 Avenue Victor Hugo", status: "En attente", date: "28/05/2023" },
  ];

  // Exemple de propriétés recommandées
  const recommendations = [
    { 
      id: 1, 
      title: "Appartement lumineux", 
      address: "78 Rue du Commerce, Paris", 
      price: "950€/mois",
      area: "45m²",
      rooms: 2,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 2, 
      title: "Studio moderne", 
      address: "15 Rue Saint-Louis, Lyon", 
      price: "650€/mois",
      area: "30m²",
      rooms: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 3, 
      title: "Maison avec jardin", 
      address: "5 Rue des Fleurs, Marseille", 
      price: "1200€/mois",
      area: "75m²",
      rooms: 3,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Locataire</h1>
            <p className="text-muted-foreground">Trouvez votre prochain logement et gérez vos candidatures</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher un bien..."
              className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">
                1 acceptée, 1 en attente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites planifiées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Prochaine visite: Demain, 14h
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 de propriétaires, 1 d'agent
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vos candidatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{application.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={
                            application.status === "Accepté" 
                              ? "success" 
                              : application.status === "Refusé" 
                                ? "destructive" 
                                : "warning"
                          }
                        >
                          {application.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Candidature du {application.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {application.status === "Accepté" && (
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contacter
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Recommandations pour vous</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{property.title}</h3>
                  <p className="text-muted-foreground text-sm">{property.address}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-primary">{property.price}</span>
                    <div className="text-sm text-muted-foreground">
                      {property.area} • {property.rooms} pièce{property.rooms > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Visiter
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Candidater
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TenantDashboard;
