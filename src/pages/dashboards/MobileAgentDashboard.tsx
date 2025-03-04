
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Home, CheckCircle, XCircle, Camera, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MobileAgentDashboard = () => {
  // Exemple de visites planifiées pour aujourd'hui
  const todayVisits = [
    { 
      id: 1, 
      property: "123 Rue de Paris",
      propertyType: "Appartement 3 pièces", 
      time: "14:00", 
      tenant: "Thomas Dubois",
      status: "À venir",
      address: "123 Rue de Paris, 75001 Paris"
    },
    { 
      id: 2, 
      property: "123 Rue de Paris",
      propertyType: "Appartement 3 pièces", 
      time: "16:30", 
      tenant: "Marie Laurent",
      status: "À venir",
      address: "123 Rue de Paris, 75001 Paris"
    },
  ];

  // Exemple de visites à venir cette semaine
  const upcomingVisits = [
    { 
      id: 3, 
      property: "8 Boulevard des Capucines",
      propertyType: "Studio 25m²", 
      date: "Demain",
      time: "10:00", 
      tenant: "Sophie Martin",
      status: "Confirmée",
      address: "8 Boulevard des Capucines, 75002 Paris"
    },
    { 
      id: 4, 
      property: "45 Avenue Victor Hugo",
      propertyType: "Maison 5 pièces",
      date: "Mercredi",
      time: "14:30", 
      tenant: "Pierre Durand",
      status: "En attente",
      address: "45 Avenue Victor Hugo, 75016 Paris"
    },
  ];

  // Exemple de visites passées
  const pastVisits = [
    { 
      id: 5, 
      property: "22 Rue du Commerce",
      propertyType: "Appartement 2 pièces", 
      date: "Hier",
      time: "11:00", 
      tenant: "Jean Dupont",
      status: "Effectuée",
      feedback: "Client très intéressé, dossier en cours",
      address: "22 Rue du Commerce, 75015 Paris"
    },
    { 
      id: 6, 
      property: "5 Rue de la Paix",
      propertyType: "Appartement 4 pièces", 
      date: "12/06/2023",
      time: "15:30", 
      tenant: "Marie Laurent",
      status: "Annulée",
      feedback: "Client n'a pas pu se libérer",
      address: "5 Rue de la Paix, 75002 Paris"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Agent Mobile</h1>
            <p className="text-muted-foreground">Gérez vos visites et votre planning</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Vos disponibilités
            </Button>
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Visite virtuelle
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayVisits.length}</div>
              <p className="text-xs text-muted-foreground">
                Prochaine à 14:00
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites cette semaine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayVisits.length + upcomingVisits.length}</div>
              <p className="text-xs text-muted-foreground">
                Dont 1 en attente de confirmation
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">
                Basé sur 24 évaluations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Zone d'activité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Paris</div>
              <p className="text-xs text-muted-foreground">
                Rayon de 15km
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visites d'aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayVisits.map((visit) => (
                <div key={visit.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-3 text-primary">
                      <Clock className="h-6 w-6" />
                      <p className="font-bold mt-1">{visit.time}</p>
                    </div>
                    <div>
                      <p className="font-medium">{visit.property}</p>
                      <p className="text-sm text-muted-foreground">{visit.propertyType}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {visit.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          Visite avec {visit.tenant}
                        </Badge>
                        <Badge 
                          variant={
                            visit.status === "À venir" 
                              ? "warning" 
                              : visit.status === "Effectuée" 
                                ? "success" 
                                : visit.status === "Annulée"
                                  ? "destructive"
                                  : "default"
                          }
                        >
                          {visit.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 gap-2 self-end md:self-auto">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Itinéraire
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contacter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="past">Passées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Visites à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingVisits.map((visit) => (
                    <div key={visit.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-3 text-primary">
                          <Calendar className="h-6 w-6" />
                          <p className="text-xs font-medium mt-1">{visit.date}</p>
                          <p className="font-bold">{visit.time}</p>
                        </div>
                        <div>
                          <p className="font-medium">{visit.property}</p>
                          <p className="text-sm text-muted-foreground">{visit.propertyType}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {visit.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              Visite avec {visit.tenant}
                            </Badge>
                            <Badge 
                              variant={
                                visit.status === "Confirmée" 
                                  ? "success" 
                                  : visit.status === "En attente" 
                                    ? "warning" 
                                    : "default"
                              }
                            >
                              {visit.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-0 gap-2 self-end md:self-auto">
                        {visit.status === "En attente" ? (
                          <>
                            <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirmer
                            </Button>
                            <Button variant="destructive" size="sm">
                              <XCircle className="h-4 w-4 mr-2" />
                              Refuser
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm">
                              <MapPin className="h-4 w-4 mr-2" />
                              Itinéraire
                            </Button>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contacter
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Visites passées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastVisits.map((visit) => (
                    <div key={visit.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3 text-gray-500">
                          <Calendar className="h-6 w-6" />
                          <p className="text-xs font-medium mt-1">{visit.date}</p>
                          <p className="font-bold">{visit.time}</p>
                        </div>
                        <div>
                          <p className="font-medium">{visit.property}</p>
                          <p className="text-sm text-muted-foreground">{visit.propertyType}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {visit.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              Visite avec {visit.tenant}
                            </Badge>
                            <Badge 
                              variant={
                                visit.status === "Effectuée" 
                                  ? "success" 
                                  : "destructive"
                              }
                            >
                              {visit.status}
                            </Badge>
                          </div>
                          {visit.feedback && (
                            <p className="text-sm mt-2 italic">{visit.feedback}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-0 gap-2 self-end md:self-auto">
                        {visit.status === "Effectuée" && (
                          <Button variant="outline" size="sm">
                            <Home className="h-4 w-4 mr-2" />
                            Voir le bien
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MobileAgentDashboard;
