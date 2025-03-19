
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, MailOpen, MailPlus, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Email = () => {
  const { user } = useAuth();
  
  // Emails adaptés à chaque type d'utilisateur
  const getRoleSpecificEmails = () => {
    switch(user?.role) {
      case 'administrator':
        return [
          { id: 1, from: "Thomas Dubois", subject: "Candidature pour l'appartement", date: "10:24", read: false, role: "tenant" },
          { id: 2, from: "Jean Dupont", subject: "Question sur les frais de gestion", date: "Hier", read: true, role: "owner" },
          { id: 3, from: "Sophie Martin", subject: "Rapport hebdomadaire", date: "Lundi", read: true, role: "administrator" },
          { id: 4, from: "Camille Roux", subject: "Problème lors d'une visite", date: "13/06", read: false, role: "mobile-agent" },
        ];
      case 'mobile-agent':
        return [
          { id: 1, from: "Thomas Dubois", subject: "Confirmation de visite", date: "10:24", read: false, role: "tenant" },
          { id: 2, from: "Sophie Martin", subject: "Nouvelles visites à planifier", date: "Hier", read: true, role: "administrator" },
          { id: 3, from: "Marie Laurent", subject: "Annulation de visite", date: "Lundi", read: false, role: "tenant" },
        ];
      case 'owner':
        return [
          { id: 1, from: "Sophie Martin", subject: "Nouveau locataire potentiel", date: "10:24", read: false, role: "administrator" },
          { id: 2, from: "Thomas Dubois", subject: "Question sur le logement", date: "Hier", read: true, role: "tenant" },
          { id: 3, from: "Camille Roux", subject: "Rapport de visite", date: "Lundi", read: true, role: "mobile-agent" },
        ];
      case 'tenant':
        return [
          { id: 1, from: "Sophie Martin", subject: "Confirmation de votre dossier", date: "10:24", read: false, role: "administrator" },
          { id: 2, from: "Jean Dupont", subject: "Information importante", date: "Hier", read: true, role: "owner" },
          { id: 3, from: "Camille Roux", subject: "Visite confirmée", date: "Lundi", read: true, role: "mobile-agent" },
        ];
      default:
        return [];
    }
  };

  const emails = getRoleSpecificEmails();

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'administrator':
        return "bg-purple-100 text-purple-800";
      case 'mobile-agent':
        return "bg-orange-100 text-orange-800";
      case 'owner':
        return "bg-green-100 text-green-800";
      case 'tenant':
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleFrenchLabel = (role: string): string => {
    switch(role) {
      case 'administrator':
        return 'Administrateur';
      case 'mobile-agent':
        return 'Agent Mobile';
      case 'owner':
        return 'Propriétaire';
      case 'tenant':
        return 'Locataire';
      default:
        return role;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Messagerie</h1>
          <div className="flex gap-2">
            <Button>
              <MailPlus className="mr-2 h-4 w-4" />
              Nouveau message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="relative w-full mb-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8 pr-4 py-2"
                />
              </div>
              <Tabs defaultValue="inbox">
                <TabsList className="w-full">
                  <TabsTrigger value="inbox" className="flex-1">Boîte de réception</TabsTrigger>
                  <TabsTrigger value="sent" className="flex-1">Envoyés</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {emails.map((email) => (
                  <div 
                    key={email.id} 
                    className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${!email.read ? 'font-semibold bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${email.id + 10}`} />
                          <AvatarFallback>{email.from.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {!email.read && (
                          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="truncate">{email.from}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{email.date}</span>
                        </div>
                        <p className="text-sm truncate">{email.subject}</p>
                        <Badge variant="outline" className={`text-xs mt-1 ${getRoleBadgeColor(email.role)}`}>
                          {getRoleFrenchLabel(email.role)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle>Messages spécifiques à votre rôle</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="p-6 border rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Bienvenue dans votre messagerie personnalisée</h2>
                    <p className="mb-4">
                      En tant que <Badge className={`${getRoleBadgeColor(user.role)}`}>{getRoleFrenchLabel(user.role)}</Badge>, 
                      vous avez accès à une messagerie adaptée à vos besoins spécifiques.
                    </p>
                    <p>
                      Cette interface vous permet de communiquer efficacement avec tous les intervenants concernés 
                      par vos responsabilités. Sélectionnez un message dans la colonne de gauche pour afficher son contenu ici.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Card className="p-4 text-center">
                      <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Total messages</p>
                      <p className="text-2xl font-bold">{emails.length}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <MailOpen className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="font-medium">Lus</p>
                      <p className="text-2xl font-bold">{emails.filter(e => e.read).length}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Mail className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="font-medium">Non lus</p>
                      <p className="text-2xl font-bold">{emails.filter(e => !e.read).length}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Trash className="h-8 w-8 mx-auto mb-2 text-red-500" />
                      <p className="font-medium">Corbeille</p>
                      <p className="text-2xl font-bold">0</p>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <p>Connectez-vous pour accéder à votre messagerie.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Email;
