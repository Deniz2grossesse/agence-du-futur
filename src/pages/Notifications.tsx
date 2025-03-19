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
import { 
  Bell, 
  Building2, 
  User, 
  BellRing, 
  AlertTriangle, 
  Banknote, 
  CheckCircle, 
  Clock, 
  X, 
  FileText, 
  Calendar, 
  Wrench, 
  CreditCard, 
  MessageSquare,
  ClipboardList,
  Shield,
  Eye,
  Droplet,
  Flame,
  Thermometer,
  Lock,
  Lightbulb,
  Plug,
  Receipt,
  PaintBucket
} from "lucide-react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("tenant");
  const [notificationFilters, setNotificationFilters] = useState({
    tenant: "all",
    owner: "all",
    banking: "all",
    incident: "all"
  });

  const tenantNotifications = {
    "rental-file": [
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
        title: "Complétez votre dossier", 
        description: "Il manque des documents pour finaliser votre candidature.",
        time: "Il y a 1 jour",
        type: "warning",
        read: true
      },
    ],
    "rental-notification": [
      { 
        id: 3, 
        title: "Nouveau message du propriétaire", 
        description: "Jean Dupont vous a envoyé un message concernant votre demande de réparation.",
        time: "Il y a 2 jours",
        type: "info",
        read: true
      },
      {
        id: 4,
        title: "Rappel de paiement",
        description: "Le paiement de votre loyer est attendu dans 5 jours.",
        time: "Il y a 1 jour",
        type: "warning",
        read: false
      }
    ],
    "visit-request": [
      {
        id: 5,
        title: "Visite programmée",
        description: "Rappel: Vous avez une visite prévue demain à 14h00 pour le studio rue Saint Louis.",
        time: "Il y a 1 jour",
        type: "info",
        read: true
      },
      {
        id: 6,
        title: "Nouvelle disponibilité",
        description: "De nouvelles plages horaires sont disponibles pour visiter l'appartement.",
        time: "Il y a 3 heures",
        type: "info",
        read: false
      }
    ],
    "equipment-revision": [
      {
        id: 7,
        title: "Maintenance annuelle",
        description: "La révision annuelle de la chaudière est prévue le 15 mars.",
        time: "Il y a 4 jours",
        type: "info",
        read: true
      },
      {
        id: 8,
        title: "Rappel d'entretien",
        description: "L'entretien des filtres de la climatisation est à prévoir ce mois-ci.",
        time: "Il y a 2 jours",
        type: "warning",
        read: false
      }
    ]
  };

  const ownerNotifications = {
    "owner-file": [
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
        title: "Dossier incomplet",
        description: "Le dossier de candidature de Marc Lefebvre nécessite des informations supplémentaires.",
        time: "Il y a 5 heures",
        type: "warning",
        read: true
      }
    ],
    "bank": [
      { 
        id: 3, 
        title: "Loyer reçu", 
        description: "Le loyer de mars 2023 a été reçu pour le bien 123 Rue de Paris.",
        time: "Il y a 3 jours",
        type: "success",
        read: true
      },
      {
        id: 4,
        title: "Versement effectué",
        description: "Le versement mensuel de 950€ a été effectué sur votre compte bancaire.",
        time: "Il y a 1 semaine",
        type: "success",
        read: true
      }
    ],
    "owner-request": [
      { 
        id: 5, 
        title: "Demande de travaux", 
        description: "Votre locataire a signalé un problème de plomberie dans la salle de bain.",
        time: "Il y a 5 jours",
        type: "warning",
        read: false
      },
      {
        id: 6,
        title: "Question du locataire",
        description: "Le locataire demande s'il peut installer une antenne parabolique.",
        time: "Il y a 2 jours",
        type: "info",
        read: false
      }
    ]
  };

  const bankingNotifications = {
    "administrative-request": [
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
        title: "Document requis",
        description: "Veuillez fournir votre dernier avis d'imposition pour mettre à jour votre dossier.",
        time: "Il y a 2 jours",
        type: "warning",
        read: true
      }
    ],
    "payment": [
      { 
        id: 3, 
        title: "Virement reçu", 
        description: "Un virement de 1200€ a été reçu de la part de Marie Laurent pour le loyer.",
        time: "Il y a 7 jours",
        type: "success",
        read: true
      },
      {
        id: 4,
        title: "Paiement en attente",
        description: "Le paiement du loyer pour l'appartement rue Victor Hugo est en attente de validation.",
        time: "Il y a 1 jour",
        type: "warning",
        read: false
      }
    ],
    "insurance": [
      { 
        id: 5, 
        title: "Renouvellement de garantie", 
        description: "Votre garantie loyers impayés arrive à échéance dans 15 jours.",
        time: "Il y a 2 jours",
        type: "warning",
        read: true
      },
      {
        id: 6,
        title: "Nouvelle offre d'assurance",
        description: "Découvrez notre nouvelle offre d'assurance habitation à tarif préférentiel.",
        time: "Il y a 3 jours",
        type: "info",
        read: false
      }
    ]
  };

  const incidentNotifications = {
    "water-damage": [
      { 
        id: 1, 
        title: "Dégât des eaux signalé", 
        description: "Un dégât des eaux a été signalé au 123 Rue de Paris, 2ème étage. Infiltration au niveau du plafond de la salle de bain.",
        time: "Il y a 30 minutes",
        type: "error",
        read: false
      },
      { 
        id: 2, 
        title: "Intervention programmée", 
        description: "Un plombier interviendra demain entre 9h et 11h pour réparer la fuite au 123 Rue de Paris.",
        time: "Il y a 2 heures",
        type: "warning",
        read: false
      },
      { 
        id: 3, 
        title: "Rapport d'assurance requis", 
        description: "L'expert en assurance demande des photos supplémentaires du dégât des eaux au 123 Rue de Paris.",
        time: "Il y a 1 jour",
        type: "info",
        read: true
      },
    ],
    "heating-electricity": [
      { 
        id: 4, 
        title: "Panne de chauffage", 
        description: "Le locataire du 45 Avenue Victor Hugo signale que le chauffage ne fonctionne plus depuis hier soir.",
        time: "Il y a 3 heures",
        type: "error",
        read: false
      },
      { 
        id: 5, 
        title: "Problème électrique résolu", 
        description: "Le problème électrique au 45 Avenue Victor Hugo a été résolu. Remplacement du disjoncteur effectué.",
        time: "Il y a 5 jours",
        type: "success",
        read: true
      },
      { 
        id: 6, 
        title: "Maintenance annuelle chaudière", 
        description: "Rappel: La maintenance annuelle de la chaudière du 8 Boulevard des Capucines est à programmer avant fin du mois.",
        time: "Il y a 2 jours",
        type: "warning",
        read: true
      },
    ],
    "security-access": [
      { 
        id: 7, 
        title: "Serrure défectueuse", 
        description: "Le locataire du 123 Rue de Paris signale un problème avec la serrure de la porte d'entrée.",
        time: "Il y a 4 heures",
        type: "warning",
        read: false
      },
      { 
        id: 8, 
        title: "Intrusion signalée", 
        description: "Une tentative d'intrusion a été signalée dans l'immeuble au 45 Avenue Victor Hugo. Vérification des caméras en cours.",
        time: "Il y a 1 jour",
        type: "error",
        read: false
      },
      { 
        id: 9, 
        title: "Changement de codes", 
        description: "Les codes d'accès de l'immeuble au 8 Boulevard des Capucines seront changés demain. Informez tous les locataires.",
        time: "Il y a 3 jours",
        type: "info",
        read: true
      },
    ],
    "maintenance-repairs": [
      { 
        id: 10, 
        title: "Demande de réparation", 
        description: "Le locataire du 8 Boulevard des Capucines signale une moisissure persistante dans la salle de bain.",
        time: "Il y a 1 jour",
        type: "warning",
        read: false
      },
      { 
        id: 11, 
        title: "Rénovation planifiée", 
        description: "La rénovation des parties communes au 123 Rue de Paris débutera le 15 du mois prochain.",
        time: "Il y a 3 jours",
        type: "info",
        read: true
      },
      { 
        id: 12, 
        title: "Intervention terminée", 
        description: "La réparation des volets au 45 Avenue Victor Hugo est terminée. Facture disponible dans l'espace propriétaire.",
        time: "Il y a 6 jours",
        type: "success",
        read: true
      },
    ]
  };

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

  const getNotificationTypeIcon = (category, type) => {
    if (category === "tenant") {
      switch (type) {
        case "rental-file":
          return <FileText className="h-5 w-5 text-blue-500" />;
        case "rental-notification":
          return <BellRing className="h-5 w-5 text-purple-500" />;
        case "visit-request":
          return <Calendar className="h-5 w-5 text-green-500" />;
        case "equipment-revision":
          return <Wrench className="h-5 w-5 text-orange-500" />;
        default:
          return <Bell className="h-5 w-5 text-blue-500" />;
      }
    } else if (category === "owner") {
      switch (type) {
        case "owner-file":
          return <FileText className="h-5 w-5 text-blue-500" />;
        case "bank":
          return <CreditCard className="h-5 w-5 text-green-500" />;
        case "owner-request":
          return <MessageSquare className="h-5 w-5 text-purple-500" />;
        default:
          return <Bell className="h-5 w-5 text-blue-500" />;
      }
    } else if (category === "banking") {
      switch (type) {
        case "administrative-request":
          return <ClipboardList className="h-5 w-5 text-blue-500" />;
        case "payment":
          return <Banknote className="h-5 w-5 text-green-500" />;
        case "insurance":
          return <Shield className="h-5 w-5 text-purple-500" />;
        default:
          return <Bell className="h-5 w-5 text-blue-500" />;
      }
    } else if (category === "incident") {
      switch (type) {
        case "water-damage":
          return <Droplet className="h-5 w-5 text-blue-500" />;
        case "heating-electricity":
          return <Thermometer className="h-5 w-5 text-orange-500" />;
        case "security-access":
          return <Lock className="h-5 w-5 text-red-500" />;
        case "maintenance-repairs":
          return <Wrench className="h-5 w-5 text-purple-500" />;
        default:
          return <AlertTriangle className="h-5 w-5 text-red-500" />;
      }
    }
    return <Bell className="h-5 w-5 text-blue-500" />;
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

  const getTenantFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={notificationFilters.tenant === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, tenant: "all"})}
      >
        Tous
      </Button>
      <Button 
        variant={notificationFilters.tenant === "rental-file" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, tenant: "rental-file"})}
        className="flex items-center gap-1"
      >
        <FileText className="h-4 w-4" /> Dossier locatif
      </Button>
      <Button 
        variant={notificationFilters.tenant === "rental-notification" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, tenant: "rental-notification"})}
        className="flex items-center gap-1"
      >
        <BellRing className="h-4 w-4" /> Notification locatif
      </Button>
      <Button 
        variant={notificationFilters.tenant === "visit-request" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, tenant: "visit-request"})}
        className="flex items-center gap-1"
      >
        <Eye className="h-4 w-4" /> Demande de visite
      </Button>
      <Button 
        variant={notificationFilters.tenant === "equipment-revision" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, tenant: "equipment-revision"})}
        className="flex items-center gap-1"
      >
        <Wrench className="h-4 w-4" /> Révision équipement
      </Button>
    </div>
  );

  const getOwnerFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={notificationFilters.owner === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, owner: "all"})}
      >
        Tous
      </Button>
      <Button 
        variant={notificationFilters.owner === "owner-file" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, owner: "owner-file"})}
        className="flex items-center gap-1"
      >
        <FileText className="h-4 w-4" /> Dossier propriétaire
      </Button>
      <Button 
        variant={notificationFilters.owner === "bank" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, owner: "bank"})}
        className="flex items-center gap-1"
      >
        <Banknote className="h-4 w-4" /> Banque
      </Button>
      <Button 
        variant={notificationFilters.owner === "owner-request" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, owner: "owner-request"})}
        className="flex items-center gap-1"
      >
        <MessageSquare className="h-4 w-4" /> Sollicitation propriétaire
      </Button>
    </div>
  );

  const getBankingFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={notificationFilters.banking === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, banking: "all"})}
      >
        Tous
      </Button>
      <Button 
        variant={notificationFilters.banking === "administrative-request" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, banking: "administrative-request"})}
        className="flex items-center gap-1"
      >
        <ClipboardList className="h-4 w-4" /> Demande administrative
      </Button>
      <Button 
        variant={notificationFilters.banking === "payment" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, banking: "payment"})}
        className="flex items-center gap-1"
      >
        <CreditCard className="h-4 w-4" /> Paiement
      </Button>
      <Button 
        variant={notificationFilters.banking === "insurance" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, banking: "insurance"})}
        className="flex items-center gap-1"
      >
        <Shield className="h-4 w-4" /> Assurance
      </Button>
    </div>
  );

  const getIncidentFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={notificationFilters.incident === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, incident: "all"})}
      >
        Tous
      </Button>
      <Button 
        variant={notificationFilters.incident === "water-damage" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, incident: "water-damage"})}
        className="flex items-center gap-1"
      >
        <Droplet className="h-4 w-4" /> Dégât des eaux
      </Button>
      <Button 
        variant={notificationFilters.incident === "heating-electricity" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, incident: "heating-electricity"})}
        className="flex items-center gap-1"
      >
        <Thermometer className="h-4 w-4" /> Chauffage/Électricité
      </Button>
      <Button 
        variant={notificationFilters.incident === "security-access" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, incident: "security-access"})}
        className="flex items-center gap-1"
      >
        <Lock className="h-4 w-4" /> Sécurité/Accès
      </Button>
      <Button 
        variant={notificationFilters.incident === "maintenance-repairs" ? "default" : "outline"}
        size="sm"
        onClick={() => setNotificationFilters({...notificationFilters, incident: "maintenance-repairs"})}
        className="flex items-center gap-1"
      >
        <Wrench className="h-4 w-4" /> Entretien/Réparations
      </Button>
    </div>
  );

  const getFilteredTenantNotifications = () => {
    if (notificationFilters.tenant === "all") {
      return [
        ...tenantNotifications["rental-file"],
        ...tenantNotifications["rental-notification"],
        ...tenantNotifications["visit-request"],
        ...tenantNotifications["equipment-revision"]
      ];
    } else {
      return tenantNotifications[notificationFilters.tenant] || [];
    }
  };

  const getFilteredOwnerNotifications = () => {
    if (notificationFilters.owner === "all") {
      return [
        ...ownerNotifications["owner-file"],
        ...ownerNotifications["bank"],
        ...ownerNotifications["owner-request"]
      ];
    } else {
      return ownerNotifications[notificationFilters.owner] || [];
    }
  };

  const getFilteredBankingNotifications = () => {
    if (notificationFilters.banking === "all") {
      return [
        ...bankingNotifications["administrative-request"],
        ...bankingNotifications["payment"],
        ...bankingNotifications["insurance"]
      ];
    } else {
      return bankingNotifications[notificationFilters.banking] || [];
    }
  };

  const getFilteredIncidentNotifications = () => {
    if (notificationFilters.incident === "all") {
      return [
        ...incidentNotifications["water-damage"],
        ...incidentNotifications["heating-electricity"],
        ...incidentNotifications["security-access"],
        ...incidentNotifications["maintenance-repairs"]
      ];
    } else {
      return incidentNotifications[notificationFilters.incident] || [];
    }
  };

  const getNotificationTypeLabel = (category, item) => {
    if (category === "tenant") {
      if (tenantNotifications["rental-file"].find(n => n.id === item.id)) return "Dossier locatif";
      if (tenantNotifications["rental-notification"].find(n => n.id === item.id)) return "Notification locatif";
      if (tenantNotifications["visit-request"].find(n => n.id === item.id)) return "Demande de visite";
      if (tenantNotifications["equipment-revision"].find(n => n.id === item.id)) return "Révision équipement";
    } else if (category === "owner") {
      if (ownerNotifications["owner-file"].find(n => n.id === item.id)) return "Dossier propriétaire";
      if (ownerNotifications["bank"].find(n => n.id === item.id)) return "Banque";
      if (ownerNotifications["owner-request"].find(n => n.id === item.id)) return "Sollicitation propriétaire";
    } else if (category === "banking") {
      if (bankingNotifications["administrative-request"].find(n => n.id === item.id)) return "Demande administrative";
      if (bankingNotifications["payment"].find(n => n.id === item.id)) return "Paiement";
      if (bankingNotifications["insurance"].find(n => n.id === item.id)) return "Assurance";
    } else if (category === "incident") {
      if (incidentNotifications["water-damage"].find(n => n.id === item.id)) return "Dégât des eaux";
      if (incidentNotifications["heating-electricity"].find(n => n.id === item.id)) return "Chauffage/Électricité";
      if (incidentNotifications["security-access"].find(n => n.id === item.id)) return "Sécurité/Accès";
      if (incidentNotifications["maintenance-repairs"].find(n => n.id === item.id)) return "Entretien/Réparations";
    }
    return "";
  };

  const getNotificationIcon = (category, item) => {
    if (category === "tenant") {
      if (tenantNotifications["rental-file"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("tenant", "rental-file");
      if (tenantNotifications["rental-notification"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("tenant", "rental-notification");
      if (tenantNotifications["visit-request"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("tenant", "visit-request");
      if (tenantNotifications["equipment-revision"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("tenant", "equipment-revision");
    } else if (category === "owner") {
      if (ownerNotifications["owner-file"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("owner", "owner-file");
      if (ownerNotifications["bank"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("owner", "bank");
      if (ownerNotifications["owner-request"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("owner", "owner-request");
    } else if (category === "banking") {
      if (bankingNotifications["administrative-request"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("banking", "administrative-request");
      if (bankingNotifications["payment"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("banking", "payment");
      if (bankingNotifications["insurance"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("banking", "insurance");
    } else if (category === "incident") {
      if (incidentNotifications["water-damage"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("incident", "water-damage");
      if (incidentNotifications["heating-electricity"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("incident", "heating-electricity");
      if (incidentNotifications["security-access"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("incident", "security-access");
      if (incidentNotifications["maintenance-repairs"].find(n => n.id === item.id)) 
        return getNotificationTypeIcon("incident", "maintenance-repairs");
    }
    return renderIcon(item.type);
  };

  const countUnreadNotifications = (category) => {
    if (category === "tenant") {
      return getFilteredTenantNotifications().filter(n => !n.read).length;
    } else if (category === "owner") {
      return getFilteredOwnerNotifications().filter(n => !n.read).length;
    } else if (category === "banking") {
      return getFilteredBankingNotifications().filter(n => !n.read).length;
    } else if (category === "incident") {
      return getFilteredIncidentNotifications().filter(n => !n.read).length;
    }
    return 0;
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
                {getFilteredTenantNotifications().filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="owner" className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Propriétaire</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {getFilteredOwnerNotifications().filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center">
              <Banknote className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Banque/Assurance</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {getFilteredBankingNotifications().filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="incident" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Incident</span>
              <Badge className="ml-2 bg-blue-500" variant="default">
                {getFilteredIncidentNotifications().filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tenant" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  {getTabIcon("tenant")}
                  <CardTitle>Notifications {getTabTitle("tenant")}</CardTitle>
                </div>
                <CardDescription>
                  {getFilteredTenantNotifications().length} notifications, dont {countUnreadNotifications("tenant")} non lues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getTenantFilters()}
                
                {getFilteredTenantNotifications().map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start justify-between p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getNotificationIcon("tenant", notification)}
                      </div>
                      <div>
                        <div className="flex items-center flex-wrap">
                          <p className="font-medium">{notification.title}</p>
                          {!notification.read && (
                            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                              Nouveau
                            </Badge>
                          )}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {getNotificationTypeLabel("tenant", notification)}
                          </Badge>
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

          <TabsContent value="owner" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  {getTabIcon("owner")}
                  <CardTitle>Notifications {getTabTitle("owner")}</CardTitle>
                </div>
                <CardDescription>
                  {getFilteredOwnerNotifications().length} notifications, dont {countUnreadNotifications("owner")} non lues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getOwnerFilters()}
                
                {getFilteredOwnerNotifications().map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start justify-between p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getNotificationIcon("owner", notification)}
                      </div>
                      <div>
                        <div className="flex items-center flex-wrap">
                          <p className="font-medium">{notification.title}</p>
                          {!notification.read && (
                            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                              Nouveau
                            </Badge>
                          )}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {getNotificationTypeLabel("owner", notification)}
                          </Badge>
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

          <TabsContent value="banking" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  {getTabIcon("banking")}
                  <CardTitle>Notifications {getTabTitle("banking")}</CardTitle>
                </div>
                <CardDescription>
                  {getFilteredBankingNotifications().length} notifications, dont {countUnreadNotifications("banking")} non lues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getBankingFilters()}
                
                {getFilteredBankingNotifications().map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start justify-between p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getNotificationIcon("banking", notification)}
                      </div>
                      <div>
                        <div className="flex items-center flex-wrap">
                          <p className="font-medium">{notification.title}</p>
                          {!notification.read && (
                            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                              Nouveau
                            </Badge>
                          )}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {getNotificationTypeLabel("banking", notification)}
                          </Badge>
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

          <TabsContent value="incident" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  {getTabIcon("incident")}
                  <CardTitle>Notifications {getTabTitle("incident")}</CardTitle>
                </div>
                <CardDescription>
                  {getFilteredIncidentNotifications().length} notifications, dont {countUnreadNotifications("incident")} non lues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getIncidentFilters()}
                
                {getFilteredIncidentNotifications().map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start justify-between p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getNotificationIcon("incident", notification)}
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
