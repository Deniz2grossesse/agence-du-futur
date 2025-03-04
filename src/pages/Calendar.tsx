
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Plus, User } from "lucide-react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample appointments data
  const appointments = [
    { 
      id: 1, 
      title: "Visite Appartement T3", 
      time: "10:00 - 11:00",
      address: "12 Rue de la Paix, 75001 Paris",
      client: "Thomas Dubois",
      type: "Visite"
    },
    { 
      id: 2, 
      title: "Signature Bail Studio", 
      time: "14:00 - 15:00",
      address: "5 Avenue Victor Hugo, 69003 Lyon",
      client: "Marie Laurent",
      type: "Signature"
    },
    { 
      id: 3, 
      title: "État des lieux - Maison", 
      time: "16:30 - 17:30",
      address: "8 Rue des Fleurs, 44000 Nantes",
      client: "Jean Dupont",
      type: "État des lieux"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Calendrier</h1>
            <p className="text-muted-foreground">
              Gérez vos rendez-vous et visites
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Légende</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span>Visite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Signature</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                  <span>État des lieux</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-0">
                <Tabs defaultValue="day">
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {date?.toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    <TabsList>
                      <TabsTrigger value="day">Jour</TabsTrigger>
                      <TabsTrigger value="week">Semaine</TabsTrigger>
                      <TabsTrigger value="month">Mois</TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription className="mt-2">
                    {appointments.length} rendez-vous aujourd'hui
                  </CardDescription>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="day" className="m-0">
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="overflow-hidden">
                        <div className={`h-2 ${
                          appointment.type === "Visite" ? "bg-blue-500" : 
                          appointment.type === "Signature" ? "bg-green-500" : "bg-amber-500"
                        }`}></div>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-semibold">{appointment.title}</h3>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              <span>{appointment.address}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="mr-1 h-4 w-4" />
                              <span>{appointment.client}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">Modifier</Button>
                            <Button size="sm">Détails</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="week" className="m-0">
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">Vue semaine à implémenter</p>
                  </div>
                </TabsContent>
                <TabsContent value="month" className="m-0">
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">Vue mois à implémenter</p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
