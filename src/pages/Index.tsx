
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Building, Home, Key, LineChart, UserCheck, Users, ArrowUp, ArrowDown, FileText, DollarSign, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  // Sample recent activities
  const recentActivities = [
    { type: "visit", title: "Nouvelle demande de visite", property: "Appartement T3 - Paris 9e", time: "Il y a 1 heures" },
    { type: "contract", title: "Nouveau contrat signé", property: "Studio - Lyon 3e", time: "Il y a 2 heures" },
    { type: "visit", title: "Nouvelle demande de visite", property: "Maison T4 - Nantes", time: "Il y a 3 heures" },
    { type: "payment", title: "Paiement reçu", property: "Duplex - Marseille", time: "Il y a 4 heures" },
    { type: "issue", title: "Problème signalé", property: "Appartement T2 - Bordeaux", time: "Il y a 5 heures" },
    { type: "visit", title: "Nouvelle demande de visite", property: "Studio - Toulouse", time: "Il y a 6 heures" },
  ];

  // Sample recent properties
  const recentProperties = [
    { name: "Appartement T3", location: "Paris 9e", surface: "68m²", price: "1250 €/mois", type: "Location" },
    { name: "Studio lumineux", location: "Lyon 3e", surface: "32m²", price: "750 €/mois", type: "Colocation" },
    { name: "Maison T4", location: "Nantes", surface: "95m²", price: "1500 €/mois", type: "Location" },
    { name: "Duplex moderne", location: "Marseille", surface: "85m²", price: "1300 €/mois", type: "Location" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-500">
              Bienvenue sur votre espace de gestion immobilier
            </p>
          </div>
          <Button variant="purple" className="rounded-xl">
            Voir tous les biens
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-4 rounded-2xl bg-white shadow transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(stat.filterParam)}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="rounded-full bg-[#7C3AED]/10 p-3">
                    <stat.icon className="h-6 w-6 text-[#7C3AED]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`font-medium flex items-center ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stat.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </span>
                  <span className="ml-2 text-gray-500">vs mois précédent</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity and Properties */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card className="rounded-2xl bg-white shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Activité récente</h2>
              <div className="space-y-4 max-h-[350px] overflow-y-auto">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-2 last:border-b-0">
                    <div className="rounded-full bg-purple-100 p-2 flex-shrink-0">
                      {activity.type === 'visit' && <Users className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'contract' && <FileText className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'issue' && <AlertCircle className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.property}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Recent Properties */}
          <Card className="rounded-2xl bg-white shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Biens récents</h2>
              <div className="space-y-4">
                {recentProperties.map((property, i) => (
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
                            {property.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {property.location} • {property.surface}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {property.price}
                        </p>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                          {property.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="purple" className="w-full rounded-xl">
                  Voir tous les biens
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
