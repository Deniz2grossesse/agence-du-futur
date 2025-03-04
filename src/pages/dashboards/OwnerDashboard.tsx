
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Home, Calendar, FileText, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OwnerDashboard = () => {
  // Exemple de propriétés pour un propriétaire
  const properties = [
    { id: 1, address: "123 Rue de Paris", status: "Occupé", tenant: "Marie Laurent", income: "1200€/mois" },
    { id: 2, address: "45 Avenue Victor Hugo", status: "Vacant", tenant: "-", income: "0€/mois" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Propriétaire</h1>
            <p className="text-muted-foreground">Gérez vos biens immobiliers et suivez vos revenus locatifs</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un bien
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Biens immobiliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
              <p className="text-xs text-muted-foreground">+1 depuis le mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50%</div>
              <p className="text-xs text-muted-foreground">1 sur 2 biens occupés</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenus mensuels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1200€</div>
              <p className="text-xs text-muted-foreground">-200€ par rapport au mois dernier</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Pour le bien vacant</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vos biens immobiliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Home className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{property.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={property.status === "Occupé" ? "success" : "warning"}>
                          {property.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {property.tenant}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-medium">{property.income}</p>
                      <p className="text-sm text-muted-foreground">Revenu mensuel</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
