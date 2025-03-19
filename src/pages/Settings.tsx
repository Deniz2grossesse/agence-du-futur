
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, Settings as SettingsIcon, Lock, FileText, Palette, 
  CreditCard, Calendar, Mail, RefreshCw, Upload, Save, Check
} from "lucide-react";
import { useState } from "react";

// Données factices pour les utilisateurs
const users = [
  {
    id: 1,
    name: "Thomas Legrand",
    email: "thomas.legrand@exemple.fr",
    role: "administrator",
    status: "actif",
    lastLogin: "05/09/2023 14:23",
    dateCreated: "01/05/2023"
  },
  {
    id: 2,
    name: "Julie Martin",
    email: "julie.martin@exemple.fr",
    role: "mobile-agent",
    status: "actif",
    lastLogin: "04/09/2023 16:45",
    dateCreated: "15/06/2023"
  },
  {
    id: 3,
    name: "Alexandre Petit",
    email: "alexandre.petit@exemple.fr",
    role: "administrator",
    status: "inactif",
    lastLogin: "20/08/2023 09:12",
    dateCreated: "10/03/2023"
  }
];

// Données factices pour les templates de documents
const documentTemplates = [
  {
    id: 1,
    name: "Contrat de bail",
    lastModified: "15/07/2023",
    status: "actif"
  },
  {
    id: 2,
    name: "Quittance de loyer",
    lastModified: "05/05/2023",
    status: "actif"
  },
  {
    id: 3,
    name: "État des lieux",
    lastModified: "30/06/2023",
    status: "actif"
  },
  {
    id: 4,
    name: "Avenant au bail",
    lastModified: "10/08/2023",
    status: "actif"
  }
];

// Données factices pour les intégrations
const integrations = [
  {
    id: 1,
    name: "Stripe",
    status: "connecté",
    description: "Paiements en ligne pour les loyers",
    lastSync: "05/09/2023"
  },
  {
    id: 2,
    name: "Google Calendar",
    status: "connecté",
    description: "Synchronisation des visites et rendez-vous",
    lastSync: "04/09/2023"
  },
  {
    id: 3,
    name: "DocuSign",
    status: "non connecté",
    description: "Signature électronique de documents",
    lastSync: null
  },
  {
    id: 4,
    name: "Mailchimp",
    status: "non connecté",
    description: "Campagnes email marketing",
    lastSync: null
  }
];

// Données factices pour les logs de connexion
const connectionLogs = [
  {
    id: 1,
    userName: "Thomas Legrand",
    date: "05/09/2023 14:23",
    ip: "192.168.1.45",
    device: "Chrome / macOS",
    status: "succès"
  },
  {
    id: 2,
    userName: "Julie Martin",
    date: "04/09/2023 16:45",
    ip: "45.67.89.12",
    device: "Safari / iOS",
    status: "succès"
  },
  {
    id: 3,
    userName: "Alexandre Petit",
    date: "20/08/2023 09:12",
    ip: "78.90.12.34",
    device: "Firefox / Windows",
    status: "succès"
  },
  {
    id: 4,
    userName: "Inconnu",
    date: "01/09/2023 22:30",
    ip: "203.0.113.195",
    device: "Chrome / Android",
    status: "échec"
  }
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");

  // Rendu des badges de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Actif</Badge>;
      case "inactif":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Inactif</Badge>;
      case "connecté":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Connecté</Badge>;
      case "non connecté":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">Non connecté</Badge>;
      case "succès":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Succès</Badge>;
      case "échec":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Échec</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Rendu des badges de rôle
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "administrator":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200">Administrateur</Badge>;
      case "mobile-agent":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Agent Mobile</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">
              Configuration et personnalisation de votre plateforme
            </p>
          </div>
        </div>

        <Tabs defaultValue="utilisateurs" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="integrations">Intégrations</TabsTrigger>
            <TabsTrigger value="charte">Charte graphique</TabsTrigger>
            <TabsTrigger value="securite">Sécurité</TabsTrigger>
          </TabsList>
          
          {/* Onglet Utilisateurs */}
          <TabsContent value="utilisateurs" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>
                    Administrez les comptes utilisateurs de la plateforme
                  </CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead>Date création</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>{user.dateCreated}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Modifier</Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              {user.status === "actif" ? "Désactiver" : "Activer"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permissions des rôles</CardTitle>
                <CardDescription>
                  Définissez les autorisations pour chaque type d'utilisateur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Administrateur</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge className="justify-center">Gestion complète</Badge>
                      <Badge className="justify-center">Facturation</Badge>
                      <Badge className="justify-center">Utilisateurs</Badge>
                      <Badge className="justify-center">Paramètres</Badge>
                      <Badge className="justify-center">Biens</Badge>
                      <Badge className="justify-center">Locataires</Badge>
                      <Badge className="justify-center">Propriétaires</Badge>
                      <Badge className="justify-center">Documents</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Agent Mobile</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge className="justify-center">Visites</Badge>
                      <Badge className="justify-center">Calendrier</Badge>
                      <Badge className="justify-center">Lecture biens</Badge>
                      <Badge className="justify-center">État des lieux</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Gérer les permissions</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onglet Templates de documents */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Templates de documents</CardTitle>
                  <CardDescription>
                    Personnalisez les modèles de documents utilisés
                  </CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Nouveau template
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du template</TableHead>
                      <TableHead>Dernière modification</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.lastModified}</TableCell>
                        <TableCell>{getStatusBadge(template.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Modifier</Button>
                            <Button variant="outline" size="sm">Aperçu</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variables disponibles</CardTitle>
                <CardDescription>
                  Variables utilisables dans vos templates de documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium mb-2">Propriétaire</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <code className="bg-muted p-1 rounded">{{owner_name}}</code>
                      <code className="bg-muted p-1 rounded">{{owner_address}}</code>
                      <code className="bg-muted p-1 rounded">{{owner_email}}</code>
                      <code className="bg-muted p-1 rounded">{{owner_phone}}</code>
                      <code className="bg-muted p-1 rounded">{{owner_tax_number}}</code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Locataire</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <code className="bg-muted p-1 rounded">{{tenant_name}}</code>
                      <code className="bg-muted p-1 rounded">{{tenant_address}}</code>
                      <code className="bg-muted p-1 rounded">{{tenant_email}}</code>
                      <code className="bg-muted p-1 rounded">{{tenant_phone}}</code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Bien</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <code className="bg-muted p-1 rounded">{{property_address}}</code>
                      <code className="bg-muted p-1 rounded">{{property_type}}</code>
                      <code className="bg-muted p-1 rounded">{{property_surface}}</code>
                      <code className="bg-muted p-1 rounded">{{property_rooms}}</code>
                      <code className="bg-muted p-1 rounded">{{rent_amount}}</code>
                      <code className="bg-muted p-1 rounded">{{charges_amount}}</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Intégrations */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {integrations.map((integration) => (
                <Card key={integration.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{integration.name}</CardTitle>
                      <CardDescription>
                        {integration.description}
                      </CardDescription>
                    </div>
                    {getStatusBadge(integration.status)}
                  </CardHeader>
                  <CardContent>
                    {integration.status === "connecté" ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Dernière synchronisation: {integration.lastSync}
                        </p>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Synchroniser
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Déconnecter
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button className="w-full">
                        Connecter {integration.name}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Webhooks API</CardTitle>
                <CardDescription>
                  Configurez des webhooks pour connecter des systèmes externes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">URL du webhook</label>
                    <div className="flex mt-1">
                      <Input 
                        value="https://api.example.com/webhook/realestate" 
                        className="rounded-r-none"
                      />
                      <Button className="rounded-l-none">
                        <Check className="mr-2 h-4 w-4" />
                        Tester
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Événements à envoyer</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="event1" className="mr-2" />
                        <label htmlFor="event1">Nouveau locataire</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="event2" className="mr-2" />
                        <label htmlFor="event2">Paiement reçu</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="event3" className="mr-2" />
                        <label htmlFor="event3">Visite programmée</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="event4" className="mr-2" />
                        <label htmlFor="event4">Document signé</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="event5" className="mr-2" />
                        <label htmlFor="event5">Ticket de maintenance</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Sauvegarder la configuration</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onglet Charte graphique */}
          <TabsContent value="charte" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisation</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de votre plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Logo de l'entreprise</label>
                    <div className="mt-2 flex items-center">
                      <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-muted">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="ml-4">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Téléverser
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG ou SVG. Max 2MB.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Favicon</label>
                    <div className="mt-2 flex items-center">
                      <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-muted">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="ml-4">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Téléverser
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          ICO ou PNG. 32x32px recommandé.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Couleurs principales</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Primaire</p>
                        <div className="flex">
                          <div className="w-8 h-8 rounded-l bg-primary"></div>
                          <Input defaultValue="#3b82f6" className="rounded-l-none" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Secondaire</p>
                        <div className="flex">
                          <div className="w-8 h-8 rounded-l bg-secondary"></div>
                          <Input defaultValue="#6b7280" className="rounded-l-none" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Accent</p>
                        <div className="flex">
                          <div className="w-8 h-8 rounded-l bg-green-500"></div>
                          <Input defaultValue="#22c55e" className="rounded-l-none" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Danger</p>
                        <div className="flex">
                          <div className="w-8 h-8 rounded-l bg-red-500"></div>
                          <Input defaultValue="#ef4444" className="rounded-l-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">En-tête emails et documents</label>
                    <div className="mt-2">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Téléverser un en-tête
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les changements
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
                <CardDescription>
                  Ces informations seront utilisées dans les documents et emails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nom de l'entreprise</label>
                    <Input defaultValue="Immobilier Gestion SAS" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Numéro SIRET</label>
                    <Input defaultValue="123 456 789 00012" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Adresse</label>
                    <Input defaultValue="25 Rue de la République, 75001 Paris" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email de contact</label>
                    <Input defaultValue="contact@immobilier-gestion.fr" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Téléphone</label>
                    <Input defaultValue="01 23 45 67 89" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Carte professionnelle</label>
                    <Input defaultValue="CPI 7501 2018 000 123 456" className="mt-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="securite" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>
                  Configurez les options de sécurité de votre plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Authentification à deux facteurs (2FA)</label>
                    <div className="mt-2 flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">2FA pour les administrateurs</p>
                        <p className="text-sm text-muted-foreground">Exiger l'authentification à deux facteurs pour tous les comptes administrateurs</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="admin2fa" className="mr-2" checked />
                        <label htmlFor="admin2fa">Activer</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm font-medium">Politique de mot de passe</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="pwd1" className="mr-2" checked />
                        <label htmlFor="pwd1">Minimum 8 caractères</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="pwd2" className="mr-2" checked />
                        <label htmlFor="pwd2">Au moins 1 majuscule</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="pwd3" className="mr-2" checked />
                        <label htmlFor="pwd3">Au moins 1 chiffre</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="pwd4" className="mr-2" checked />
                        <label htmlFor="pwd4">Au moins 1 caractère spécial</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="pwd5" className="mr-2" />
                        <label htmlFor="pwd5">Expiration tous les 90 jours</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm font-medium">Sessions</label>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Durée max. de session (heures)</label>
                        <Input type="number" defaultValue="24" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Tentatives max. de connexion</label>
                        <Input type="number" defaultValue="5" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les paramètres
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Journaux de connexion</CardTitle>
                <CardDescription>
                  Historique des connexions à votre plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Date et heure</TableHead>
                      <TableHead>Adresse IP</TableHead>
                      <TableHead>Appareil</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {connectionLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.userName}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                        <TableCell>{log.device}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualiser
                </Button>
                <Button variant="outline">
                  Afficher plus
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Données personnelles et RGPD</CardTitle>
                <CardDescription>
                  Gestion des données personnelles et conformité RGPD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">Politique de confidentialité</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Dernière mise à jour: 01/06/2023
                    </p>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Modifier la politique
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">Durée de conservation des données</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <p>Données de compte utilisateur après inactivité</p>
                        <div className="flex items-center w-32">
                          <Input type="number" defaultValue="36" className="text-center" />
                          <span className="ml-2">mois</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>Logs de connexion</p>
                        <div className="flex items-center w-32">
                          <Input type="number" defaultValue="12" className="text-center" />
                          <span className="ml-2">mois</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Fonctionnalités RGPD</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline">
                        Exportation des données
                      </Button>
                      <Button variant="outline">
                        Demandes de suppression
                      </Button>
                      <Button variant="outline">
                        Journal des consentements
                      </Button>
                      <Button variant="outline">
                        Registre de traitement
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
