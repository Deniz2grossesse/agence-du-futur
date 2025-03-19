import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Messages = () => {
  // Sample contacts data
  const contacts = [
    { id: 1, name: "Thomas Dubois", status: "online", lastMessage: "Bonjour, je suis intéressé par l'appartement", unread: 2 },
    { id: 2, name: "Marie Laurent", status: "offline", lastMessage: "Merci pour les informations", unread: 0 },
    { id: 3, name: "Jean Dupont", status: "online", lastMessage: "À quelle heure pour la visite demain ?", unread: 1 },
    { id: 4, name: "Sophie Martin", status: "offline", lastMessage: "Le contrat est bien reçu", unread: 0 },
    { id: 5, name: "Pierre Durand", status: "offline", lastMessage: "Je confirme ma présence", unread: 0 },
  ];

  // Sample messages data
  const messages = [
    { id: 1, sender: "user", content: "Bonjour, je suis intéressé par l'appartement T3 sur Paris.", time: "10:23" },
    { id: 2, sender: "other", content: "Bonjour Thomas, merci pour votre intérêt ! L'appartement est toujours disponible. Souhaitez-vous organiser une visite ?", time: "10:25" },
    { id: 3, sender: "user", content: "Oui, j'aimerais bien. Quelles sont vos disponibilités cette semaine ?", time: "10:28" },
    { id: 4, sender: "other", content: "Je peux vous proposer mercredi à 15h ou jeudi à 17h. Quelle date vous conviendrait le mieux ?", time: "10:30" },
    { id: 5, sender: "user", content: "Mercredi à 15h serait parfait pour moi.", time: "10:32" },
    { id: 6, sender: "other", content: "Très bien, c'est noté ! L'adresse est 12 Rue de la Paix, 75001 Paris. Avez-vous des questions particulières avant la visite ?", time: "10:35" },
  ];

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)]">
        <div className="grid h-full gap-6 md:grid-cols-[300px_1fr]">
          <Card className="h-full flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Rechercher une conversation"
                  className="h-9"
                  startIcon={<Search className="h-4 w-4" />}
                />
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1">
              <CardContent className="p-0">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className={`flex items-center gap-3 p-3 border-b cursor-pointer transition-colors ${
                      contact.id === 1 ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${contact.id}`} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        contact.status === "online" ? "bg-green-500" : "bg-gray-300"
                      }`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium truncate">{contact.name}</p>
                        {contact.unread > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader className="px-6 py-4 border-b flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                  <AvatarFallback>TD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Thomas Dubois</CardTitle>
                  <p className="text-sm text-muted-foreground">En ligne</p>
                </div>
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.sender === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Écrivez votre message..."
                  className="min-h-[80px]"
                />
                <Button className="mt-auto" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
