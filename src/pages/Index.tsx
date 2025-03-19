
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Building, Home, Key, LineChart, UserCheck, Users, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Sample stats data that would normally come from an API
  const stats = [
    { title: "Nouvelles visites", value: "245", change: "+12.5%", isPositive: true, icon: UserCheck, filterParam: "new-visits" },
    { title: "Biens actifs", value: "38", change: "+3.8%", isPositive: true, icon: Building, filterParam: "active" },
    { title: "Taux de conversion", value: "3.2%", change: "+0.4%", isPositive: true, icon: LineChart, filterParam: "converted" },
    { title: "Locations en cours", value: "14", change: "-2", isPositive: false, icon: Key, filterParam: "rented" },
  ];

  const handleCardClick = (filterParam) => {
    navigate(`/properties?filter=${filterParam}`);
  };

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
          <Link 
            to="/properties" 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-400 transition-colors"
          >
            Voir tous les biens
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="rounded-2xl bg-white shadow transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(stat.filterParam)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`font-medium flex items-center ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stat.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </span>
                  <span className="ml-2 text-muted-foreground">vs mois précédent</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity and Properties */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl bg-white shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Activité récente</h2>
              <div className="space-y-4 max-h-[350px] overflow-y-auto">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-2 last:border-b-0">
                    <div className="rounded-full bg-purple-100 p-3 flex-shrink-0">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">
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
            </div>
          </Card>
          
          <Card className="rounded-2xl bg-white shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Biens récents</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 border-b pb-3 last:border-b-0">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0 bg-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Home className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900">
                            {i % 2 === 0 ? "Appartement T3" : "Studio lumineux"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {i % 2 === 0 ? "Paris 9e • 68m²" : "Lyon 3e • 32m²"}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {(i + 1) * 250 + 500} €/mois
                        </p>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                          {i % 2 === 0 ? "Location" : "Colocation"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
