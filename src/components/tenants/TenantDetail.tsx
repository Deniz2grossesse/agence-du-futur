
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Users, Mail, Phone, Clock, Check, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface TenantDetailProps {
  tenant: any;
}

const TenantDetail = ({ tenant }: TenantDetailProps) => {
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "payé":
        return <Badge variant="outline" className="bg-green-100 text-green-700">Payé</Badge>;
      case "retard":
        return <Badge variant="outline" className="bg-red-100 text-red-700">Retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTicketStatusBadge = (status: string) => {
    switch (status) {
      case "résolu":
        return <Badge variant="outline" className="bg-green-100 text-green-700">Résolu</Badge>;
      case "en cours":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700">En cours</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDocumentIcon = (document: any) => {
    return document.signed 
      ? <Check className="h-4 w-4 text-green-600" /> 
      : <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center text-2xl font-bold text-gray-600">
                {tenant.name.charAt(0)}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Nom</p>
              <p className="font-medium">{tenant.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Âge</p>
                <p className="font-medium">{tenant.personalInfo.age} ans</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profession</p>
                <p className="font-medium">{tenant.personalInfo.job}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Revenus</p>
              <p className="font-medium">{tenant.personalInfo.income}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Garant</p>
              <p className="font-medium">{tenant.personalInfo.guarantor}</p>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-muted-foreground">Contacts</p>
              <div className="flex items-center mt-2">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{tenant.email}</p>
              </div>
              <div className="flex items-center mt-2">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{tenant.phone}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Logement actuel</p>
              <p className="font-medium">{tenant.property}</p>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">Depuis le {tenant.moveInDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations bail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Loyer mensuel</p>
              <p className="text-xl font-bold">{tenant.rent} €</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Dernier paiement</p>
              <p className="font-medium">{tenant.lastPayment}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Début du bail</p>
              <p className="font-medium">{tenant.moveInDate}</p>
            </div>
            
            {tenant.status === "préavis" && (
              <div>
                <p className="text-sm text-muted-foreground">Préavis déposé</p>
                <p className="font-medium">
                  {tenant.documents.find((d: any) => d.name.includes("Préavis"))?.date || "Date inconnue"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-3">
        <Tabs defaultValue="payments">
          <TabsList className="mb-4">
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="tickets">Tickets maintenance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 pb-4">
                  {/* Timeline vertical line */}
                  <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {tenant.payments.map((payment: any, index: number) => (
                    <div key={payment.id} className="mb-6 relative">
                      {/* Timeline circle */}
                      <div className={`absolute left-0 w-6 h-6 rounded-full -ml-3 flex items-center justify-center
                        ${payment.status === "payé" ? "bg-green-100" : "bg-red-100"}`}>
                        <div className={`w-3 h-3 rounded-full 
                          ${payment.status === "payé" ? "bg-green-500" : "bg-red-500"}`}></div>
                      </div>
                      
                      <div className="ml-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Loyer du mois de {payment.date.split("/")[1]}/{payment.date.split("/")[2]}</p>
                            <p className="text-sm text-muted-foreground">Payé le: {payment.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{payment.amount} €</p>
                            <p>{getPaymentStatusBadge(payment.status)}</p>
                          </div>
                        </div>
                        <div className="mt-2 p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Méthode de paiement:</span>
                            <span className="text-sm font-medium">{payment.method}</span>
                          </div>
                          {payment.status === "retard" && (
                            <div className="mt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">
                                    <Send className="h-4 w-4 mr-2" />
                                    Envoyer relance
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Relance de paiement</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm font-medium mb-1">Destinataire</p>
                                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                                        <span>{tenant.name}</span>
                                        <span className="mx-2 text-gray-400">•</span>
                                        <span className="text-muted-foreground">{tenant.email}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium mb-1">Sujet</p>
                                      <div className="p-2 bg-gray-50 rounded-md">
                                        Rappel de paiement de loyer - {payment.date.split("/")[1]}/{payment.date.split("/")[2]}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium mb-1">Message</p>
                                      <Textarea
                                        defaultValue={`Bonjour ${tenant.name},\n\nNous n'avons pas encore reçu votre paiement de loyer pour le mois de ${payment.date.split("/")[1]}/${payment.date.split("/")[2]} d'un montant de ${payment.amount} €.\n\nNous vous prions de bien vouloir régulariser la situation dans les plus brefs délais.\n\nCordialement,\nVotre agence immobilière`}
                                        className="min-h-[200px]"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button>Envoyer le message</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tickets de maintenance</CardTitle>
                  <Badge>
                    {tenant.tickets.length} ticket{tenant.tickets.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {tenant.tickets.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Aucun ticket de maintenance</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tenant.tickets.map((ticket: any) => (
                      <div key={ticket.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{ticket.title}</p>
                            <p className="text-sm text-muted-foreground">Ouvert le {ticket.date}</p>
                          </div>
                          <div>
                            {getTicketStatusBadge(ticket.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {tenant.documents.map((document: any) => (
                    <div
                      key={document.id}
                      className="flex items-center p-4 border rounded-lg group hover:bg-gray-50 transition-colors"
                    >
                      <div className="mr-4 p-3 bg-blue-50 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <p className="font-medium">{document.name}</p>
                          <div className="ml-2">
                            {getDocumentIcon(document)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ajouté le {document.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        {!document.signed && (
                          <Button size="sm">Signer</Button>
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
    </div>
  );
};

export default TenantDetail;
