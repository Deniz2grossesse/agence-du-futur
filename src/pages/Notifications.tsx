
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Building, User, BellRing, Building2, AlertTriangle, Banknote, CheckCircle, Clock, X } from "lucide-react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("tenant");

  const tenantNotifications = [
    { 
      id: 1, 
      title: "Votre dossier a été accepté", 
      description: "Votre dossier pour l'appartement au 123 Rue de Paris a été accepté.",
      time: "Il y a 2 heures",
      type: "success",
      read: false
    },
    { 
      id: 2, 
      title: "Visite programmée", 
      description: "Rappel: Vous avez une visite prévue demain à 14h00 pour le studio rue Saint Louis.",
      time: "Il y a 1 jour",
      type: "info",
      read: true
    },
    { 
      id: 3, 
      title: "Nouveau message du propriétaire", 
      description: "Jean Dupont vous a envoyé un message concernant votre demande de réparation.",
      time: "Il y a 2 jours",
      type: "info",
      read: true
    },
  ];

  const ownerNotifications = [
    { 
      id: 1, 
      title: "Nouvelle candidature", 
      description: "Sophie Martin a déposé une candidature pour votre appartement du 45 Avenue Victor Hugo.",
      time: "Il y a 1 heure",
      type: "info",
      read: false
    },
    { 
      id: 2, 
      title: "Loyer reçu", 
      description: "Le loyer de mars 2023 a été reçu pour le bien 123 Rue de Paris.",
      time: "Il y a 3 jours",
      type: "success",
      read: true
    },
    { 
      id: 3, 
      title: "Demande de travaux", 
      description: "Votre locataire a signalé un problème de plomberie dans la salle de bain.",
      time: "Il y a 5 jours",
      type: "warning",
      read: false
    },
  ];

  const bankingNotifications = [
    { 
      id: 1, 
      title: "Attestation d'assurance disponible", 
      description: "Votre nouvelle attestation d'assurance habitation est disponible.",
      time: "Il y a 5 heures",
      type: "info",
      read: false
    },
    { 
      id: 2, 
      title: "Renouvellement de garantie", 
      description: "Votre garantie loyers impayés arrive à échéance dans 15 jours.",
      time: "Il y a 2 jours",
      type: "warning",
      read: true
    },
    { 
      id: 3, 
      title: "Virement reçu", 
      description: "Un virement de 1200€ a été reçu de la part de Marie Laurent pour le loyer.",
      time: "Il y a 7 jours",
      type: "success",
      read: true
    },
  ];

  const incidentNotifications = [
    { 
      id: 1, 
      title: "Dégât des eaux signalé", 
      description: "Un dégât des eaux a été signalé au 123 Rue de Paris, 2ème étage.",
      time: "Il y a 30 minutes",
      type: "error",
      read: false
    },
    { 
      id: 2, 
      title: "Intervention programmée", 
      description: "Un plombier interviendra demain entre 9h et 11h pour réparer la fuite.",
      time: "Il y a 2 heures",
      type: "warning",
      read: false
    },
    { 
      id: 3, 
      title: "Incident résolu", 
      description: "Le problème électrique au 45 Avenue Victor Hugo a été résolu.",
      time: "Il y a 5 jours",
      type: "success",
      read: true
    },
  ];

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationData = (tabKey) => {
    switch (tabKey) {
      case "tenant":
        return tenantNotifications;
      case "owner":
        return ownerNotifications;
      case "banking":
        return bankingNotifications;
      case "incident":
        return incidentNotifications;
      default:
        return [];
    }
  };

  const getTabIcon = (tabKey) => {
    switch (tabKey) {
      case "tenant":
        return <User className="h-4 w-4 mr-2" />;
      case "owner":
        return <Building2 className="h-4 w-4 mr-2" />;
      case "banking":
        return <Banknote className="h-4 w-4 mr-2" />;
      case "incident":
        return <AlertTriangle className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const getTabTitle = (tabKey) => {
    switch (tabKey) {
      case "tenant":
        return "Locataire";
      case "owner":
        return "Propriétaire";
      case "banking":
        return "Banque/Assurance";
      case "incident":
        return "Incident";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Gérez toutes vos notifications et alertes</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Marquer tout comme lu
          </Button>
        </div>

        <Tabs defaultValue="tenant" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4 w-full">
            <TabsTrigger value="tenant" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Locataire</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {tenantNotifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="owner" className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Propriétaire</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {ownerNotifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center">
              <Banknote className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Banque/Assurance</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {bankingNotifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="incident" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Incident</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {incidentNotifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {["tenant", "owner", "banking", "incident"].map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    {getTabIcon(tabKey)}
                    <CardTitle>Notifications {getTabTitle(tabKey)}</CardTitle>
                  </div>
                  <CardDescription>
                    {getNotificationData(tabKey).length} notifications, dont {getNotificationData(tabKey).filter(n => !n.read).length} non lues
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getNotificationData(tabKey).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start justify-between p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                    >
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {renderIcon(notification.type)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{notification.title}</p>
                            {!notification.read && (
                              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                                Nouveau
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
