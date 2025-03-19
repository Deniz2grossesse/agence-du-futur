
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Bell, Filter, ArrowDown, MoreVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Layout from '@/components/layout/Layout';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [tenantFilter, setTenantFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [bankingFilter, setBankingFilter] = useState("all");
  const [incidentFilter, setIncidentFilter] = useState("all");

  // Tenant notifications
  const tenantNotifications = {
    "dossier-locatif": [
      {
        id: 1,
        title: "Mise à jour du dossier locatif",
        description: "Votre dossier locatif a été mis à jour avec de nouvelles informations.",
        time: "Il y a 2 heures",
        type: "dossier-locatif",
        read: false
      },
      {
        id: 2,
        title: "Document manquant",
        description: "Un document est manquant dans votre dossier locatif. Veuillez le fournir dès que possible.",
        time: "Hier",
        type: "dossier-locatif",
        read: true
      }
    ],
    "notification-locatif": [
      {
        id: 3,
        title: "Rappel de paiement",
        description: "Le paiement de votre loyer est prévu pour le 5 du mois prochain.",
        time: "Il y a 1 jour",
        type: "notification-locatif",
        read: false
      },
      {
        id: 4,
        title: "Augmentation de loyer",
        description: "Une augmentation de loyer de 2% sera appliquée à partir du prochain mois.",
        time: "Il y a 3 jours",
        type: "notification-locatif",
        read: true
      }
    ],
    "demande-visite": [
      {
        id: 5,
        title: "Visite de maintenance programmée",
        description: "Une visite technique est prévue le 15/06 entre 10h et 12h.",
        time: "Il y a 5 heures",
        type: "demande-visite",
        read: false
      },
      {
        id: 6,
        title: "Visite annuelle",
        description: "La visite annuelle de contrôle aura lieu le mois prochain.",
        time: "Il y a 1 semaine",
        type: "demande-visite",
        read: true
      }
    ],
    "revision-equipement": [
      {
        id: 7,
        title: "Révision de la chaudière",
        description: "La révision annuelle de votre chaudière est programmée pour la semaine prochaine.",
        time: "Il y a 2 jours",
        type: "revision-equipement",
        read: false
      },
      {
        id: 8,
        title: "Maintenance des détecteurs de fumée",
        description: "Une vérification des détecteurs de fumée est nécessaire.",
        time: "Il y a 2 semaines",
        type: "revision-equipement",
        read: true
      }
    ]
  };

  // Owner notifications
  const ownerNotifications = {
    "dossier-proprietaire": [
      {
        id: 9,
        title: "Nouveau document ajouté",
        description: "Un nouveau document a été ajouté à votre dossier propriétaire.",
        time: "Il y a 3 heures",
        type: "dossier-proprietaire",
        read: false
      },
      {
        id: 10,
        title: "Mise à jour fiscale",
        description: "Des informations fiscales importantes ont été mises à jour dans votre dossier.",
        time: "Il y a 2 jours",
        type: "dossier-proprietaire",
        read: true
      }
    ],
    "banque": [
      {
        id: 11,
        title: "Virement effectué",
        description: "Le virement des loyers du mois a été effectué sur votre compte.",
        time: "Aujourd'hui",
        type: "banque",
        read: false
      },
      {
        id: 12,
        title: "Relevé de gestion disponible",
        description: "Votre relevé de gestion du trimestre est disponible.",
        time: "Il y a 5 jours",
        type: "banque",
        read: true
      }
    ],
    "solicitation-proprietaire": [
      {
        id: 13,
        title: "Demande de travaux",
        description: "Le locataire a fait une demande de travaux pour la salle de bain.",
        time: "Il y a 1 jour",
        type: "solicitation-proprietaire",
        read: false
      },
      {
        id: 14,
        title: "Renouvellement de bail",
        description: "Le bail de votre locataire arrive à échéance dans 3 mois.",
        time: "Il y a 1 semaine",
        type: "solicitation-proprietaire",
        read: true
      }
    ]
  };

  // Banking notifications
  const bankingNotifications = {
    "demande-administratif": [
      {
        id: 15,
        title: "Document requis",
        description: "Veuillez fournir une attestation d'assurance mise à jour.",
        time: "Il y a 6 heures",
        type: "demande-administratif",
        read: false
      },
      {
        id: 16,
        title: "Validation de compte",
        description: "Votre RIB a été validé avec succès.",
        time: "Il y a 4 jours",
        type: "demande-administratif",
        read: true
      }
    ],
    "payment": [
      {
        id: 17,
        title: "Paiement reçu",
        description: "Le paiement du mois de juin a été reçu et traité.",
        time: "Hier",
        type: "payment",
        read: false
      },
      {
        id: 18,
        title: "Échéance à venir",
        description: "Une échéance de paiement est prévue pour le 1er du mois prochain.",
        time: "Il y a 3 jours",
        type: "payment",
        read: true
      }
    ],
    "assurance": [
      {
        id: 19,
        title: "Renouvellement d'assurance",
        description: "Votre assurance habitation doit être renouvelée avant la fin du mois.",
        time: "Il y a 2 jours",
        type: "assurance",
        read: false
      },
      {
        id: 20,
        title: "Contrat mis à jour",
        description: "Les termes de votre contrat d'assurance ont été mis à jour.",
        time: "Il y a 2 semaines",
        type: "assurance",
        read: true
      }
    ]
  };

  // Incident notifications
  const incidentNotifications = {
    "water-damage": [
      {
        id: 21,
        title: "Dégât des eaux signalé",
        description: "Un dégât des eaux a été signalé dans la salle de bain de l'appartement 103.",
        time: "Il y a 3 heures",
        type: "water-damage",
        read: false
      },
      {
        id: 22,
        title: "Intervention plombier",
        description: "Le plombier est intervenu suite au dégât des eaux. Rapport disponible.",
        time: "Il y a 2 jours",
        type: "water-damage",
        read: true
      }
    ],
    "heating-electricity": [
      {
        id: 23,
        title: "Panne de chauffage",
        description: "Une panne de chauffage a été signalée dans l'immeuble B.",
        time: "Aujourd'hui",
        type: "heating-electricity",
        read: false
      },
      {
        id: 24,
        title: "Coupure électrique prévue",
        description: "Une coupure électrique est prévue le 20/06 pour travaux de maintenance.",
        time: "Il y a 4 jours",
        type: "heating-electricity",
        read: true
      }
    ],
    "security-access": [
      {
        id: 25,
        title: "Problème de serrure",
        description: "Un locataire signale un problème avec la serrure de la porte d'entrée.",
        time: "Il y a 1 jour",
        type: "security-access",
        read: false
      },
      {
        id: 26,
        title: "Mise à jour du système d'accès",
        description: "Le système de badges d'accès sera mis à jour la semaine prochaine.",
        time: "Il y a 1 semaine",
        type: "security-access",
        read: true
      }
    ],
    "maintenance-repairs": [
      {
        id: 27,
        title: "Intervention de maintenance",
        description: "Une intervention de maintenance est programmée pour la toiture de l'immeuble.",
        time: "Il y a 5 heures",
        type: "maintenance-repairs",
        read: false
      },
      {
        id: 28,
        title: "Réparation effectuée",
        description: "La réparation du volet roulant de l'appartement 205 a été effectuée.",
        time: "Il y a 3 jours",
        type: "maintenance-repairs",
        read: true
      }
    ]
  };

  // Generic function to get filtered notifications based on type and filter
  const getFilteredNotifications = (notificationsObj, filter) => {
    if (filter === "all") {
      // Flatten the object of arrays into a single array
      return Object.values(notificationsObj).flat();
    } else {
      // Return just the array for the selected filter
      return notificationsObj[filter] || [];
    }
  };

  // Get filtered notifications based on active tab and respective filter
  const getTabNotifications = () => {
    switch (activeTab) {
      case "tenant":
        return getFilteredNotifications(tenantNotifications, tenantFilter);
      case "owner":
        return getFilteredNotifications(ownerNotifications, ownerFilter);
      case "banking":
        return getFilteredNotifications(bankingNotifications, bankingFilter);
      case "incident":
        return getFilteredNotifications(incidentNotifications, incidentFilter);
      case "all":
        return [
          ...getFilteredNotifications(tenantNotifications, tenantFilter),
          ...getFilteredNotifications(ownerNotifications, ownerFilter),
          ...getFilteredNotifications(bankingNotifications, bankingFilter),
          ...getFilteredNotifications(incidentNotifications, incidentFilter)
        ];
      default:
        return [];
    }
  };

  const notifications = getTabNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-gray-500">Gérez vos notifications et restez informé</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Bell size={14} /> {unreadCount} non lues
            </Badge>
            <Button variant="outline" size="sm">
              <CheckCircle size={14} className="mr-1" /> Tout marquer comme lu
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="tenant">Locataire</TabsTrigger>
              <TabsTrigger value="owner">Propriétaire</TabsTrigger>
              <TabsTrigger value="banking">Banque/Assurance</TabsTrigger>
              <TabsTrigger value="incident">Incidents</TabsTrigger>
            </TabsList>
            
            {activeTab === "tenant" && (
              <Select value={tenantFilter} onValueChange={setTenantFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="dossier-locatif">Dossier locatif</SelectItem>
                  <SelectItem value="notification-locatif">Notification locatif</SelectItem>
                  <SelectItem value="demande-visite">Demande de visite</SelectItem>
                  <SelectItem value="revision-equipement">Révision équipement</SelectItem>
                </SelectContent>
              </Select>
            )}

            {activeTab === "owner" && (
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="dossier-proprietaire">Dossier propriétaire</SelectItem>
                  <SelectItem value="banque">Banque</SelectItem>
                  <SelectItem value="solicitation-proprietaire">Solicitation propriétaire</SelectItem>
                </SelectContent>
              </Select>
            )}

            {activeTab === "banking" && (
              <Select value={bankingFilter} onValueChange={setBankingFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="demande-administratif">Demande administratif</SelectItem>
                  <SelectItem value="payment">Paiement</SelectItem>
                  <SelectItem value="assurance">Assurance</SelectItem>
                </SelectContent>
              </Select>
            )}

            {activeTab === "incident" && (
              <Select value={incidentFilter} onValueChange={setIncidentFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="water-damage">Dégât des eaux</SelectItem>
                  <SelectItem value="heating-electricity">Chauffage/Électricité</SelectItem>
                  <SelectItem value="security-access">Sécurité/Accès</SelectItem>
                  <SelectItem value="maintenance-repairs">Maintenance/Réparations</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <TabsContent value="all" className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          
          <TabsContent value="tenant" className="space-y-4">
            {getFilteredNotifications(tenantNotifications, tenantFilter).length > 0 ? (
              getFilteredNotifications(tenantNotifications, tenantFilter).map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          
          <TabsContent value="owner" className="space-y-4">
            {getFilteredNotifications(ownerNotifications, ownerFilter).length > 0 ? (
              getFilteredNotifications(ownerNotifications, ownerFilter).map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          
          <TabsContent value="banking" className="space-y-4">
            {getFilteredNotifications(bankingNotifications, bankingFilter).length > 0 ? (
              getFilteredNotifications(bankingNotifications, bankingFilter).map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          
          <TabsContent value="incident" className="space-y-4">
            {getFilteredNotifications(incidentNotifications, incidentFilter).length > 0 ? (
              getFilteredNotifications(incidentNotifications, incidentFilter).map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const NotificationCard = ({ notification }) => {
  return (
    <Card className={`transition hover:bg-muted/50 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={notification.read ? "outline" : "default"} className="text-xs">
                {getNotificationTypeLabel(notification.type)}
              </Badge>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
            <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Marquer comme lu</DropdownMenuItem>
              <DropdownMenuItem>Archiver</DropdownMenuItem>
              <DropdownMenuItem>Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center py-10">
      <Bell size={40} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-500">Aucune notification</h3>
      <p className="text-gray-400 mt-1">Vous n'avez aucune notification dans cette catégorie</p>
    </div>
  );
};

const getNotificationTypeLabel = (type) => {
  const labels = {
    // Tenant
    "dossier-locatif": "Dossier locatif",
    "notification-locatif": "Notification locatif",
    "demande-visite": "Demande de visite",
    "revision-equipement": "Révision équipement",
    
    // Owner
    "dossier-proprietaire": "Dossier propriétaire",
    "banque": "Banque",
    "solicitation-proprietaire": "Solicitation propriétaire",
    
    // Banking
    "demande-administratif": "Demande administratif",
    "payment": "Paiement",
    "assurance": "Assurance",
    
    // Incident
    "water-damage": "Dégât des eaux",
    "heating-electricity": "Chauffage/Électricité",
    "security-access": "Sécurité/Accès",
    "maintenance-repairs": "Maintenance/Réparations"
  };
  
  return labels[type] || type;
};

export default Notifications;
