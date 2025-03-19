
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Download, Filter, DollarSign, RefreshCw, FileText, Building2, Check, AlertTriangle, Send, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Données factices pour les paiements
const rentPayments = [
  {
    id: 1,
    property: "Appartement T3 - Paris 9e",
    tenant: "Sophie Martin",
    amount: 1200,
    status: "payé",
    dueDate: "01/09/2023",
    paymentDate: "01/09/2023",
    paymentMethod: "Virement bancaire"
  },
  {
    id: 2,
    property: "Studio - Lyon 3e",
    tenant: "Thomas Dubois",
    amount: 750,
    status: "retard",
    dueDate: "01/09/2023",
    paymentDate: null,
    paymentMethod: null
  },
  {
    id: 3,
    property: "Maison T4 - Nice",
    tenant: "Emma Petit",
    amount: 1900,
    status: "payé",
    dueDate: "01/09/2023",
    paymentDate: "02/09/2023",
    paymentMethod: "Prélèvement automatique"
  },
  {
    id: 4,
    property: "Loft - Bordeaux",
    tenant: "Lucas Moreau",
    amount: 1500,
    status: "payé",
    dueDate: "01/09/2023",
    paymentDate: "31/08/2023",
    paymentMethod: "Virement bancaire"
  },
  {
    id: 5,
    property: "Appartement T2 - Nantes",
    tenant: "Chloé Roux",
    amount: 850,
    status: "retard",
    dueDate: "01/09/2023",
    paymentDate: null,
    paymentMethod: null
  }
];

const deposits = [
  {
    id: 1,
    tenant: "Sophie Martin",
    property: "Appartement T3 - Paris 9e",
    amount: 2400,
    status: "encaissé",
    date: "15/03/2023",
    shouldReturn: false
  },
  {
    id: 2,
    tenant: "Thomas Dubois",
    property: "Studio - Lyon 3e",
    amount: 1500,
    status: "encaissé",
    date: "10/08/2022",
    shouldReturn: false
  },
  {
    id: 3,
    tenant: "Emma Petit",
    property: "Maison T4 - Nice",
    amount: 3800,
    status: "encaissé",
    date: "01/06/2023",
    shouldReturn: true
  }
];

const ownerPayments = [
  {
    id: 1,
    owner: "Jean Dupont",
    amount: 2850,
    properties: 3,
    status: "effectué",
    date: "05/09/2023"
  },
  {
    id: 2,
    owner: "Marie Richard",
    amount: 1650,
    properties: 2,
    status: "en attente",
    date: "10/09/2023"
  }
];

// Liste des biens pour la génération de bordereau
const ownerProperties = [
  { id: 1, owner: "Jean Dupont", name: "Appartement T3 - Paris 9e", rent: 1200, fee: 8 },
  { id: 2, owner: "Jean Dupont", name: "Maison T4 - Nice", rent: 1900, fee: 8 },
  { id: 3, owner: "Jean Dupont", name: "Studio - Marseille", rent: 550, fee: 8 },
  { id: 4, owner: "Marie Richard", name: "Loft - Bordeaux", rent: 1500, fee: 7.5 },
  { id: 5, owner: "Marie Richard", name: "Appartement T2 - Nantes", rent: 850, fee: 7.5 }
];

const Payments = () => {
  const [activeTab, setActiveTab] = useState("loyers");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [sortedPayments, setSortedPayments] = useState([...rentPayments]);
  const [updatedDeposits, setUpdatedDeposits] = useState([...deposits]);
  const { toast } = useToast();

  // Sorting logic for payments by date
  useEffect(() => {
    const sorted = [...rentPayments].sort((a, b) => {
      const dateA = a.paymentDate ? new Date(a.paymentDate.split('/').reverse().join('-')) : new Date(0);
      const dateB = b.paymentDate ? new Date(b.paymentDate.split('/').reverse().join('-')) : new Date(0);
      
      return sortDirection === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    });
    
    setSortedPayments(sorted);
  }, [sortDirection]);

  // Filtering logic for rent payments
  const filteredRentPayments = sortedPayments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "tous" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  // Toggle deposit return status
  const toggleDepositReturn = (id: number) => {
    setUpdatedDeposits(prev => 
      prev.map(deposit => 
        deposit.id === id ? { ...deposit, shouldReturn: !deposit.shouldReturn } : deposit
      )
    );
  };

  // Handle export with loading animation
  const handleExport = (format: string) => {
    setLoading(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          toast({
            title: "Export réussi",
            description: `Le fichier a été exporté au format ${format}`,
          });
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Calculate total amount for selected properties
  const calculateTotalAmount = () => {
    return ownerProperties
      .filter(prop => selectedProperties.includes(prop.id))
      .reduce((sum, prop) => {
        const feeAmount = (prop.rent * prop.fee) / 100;
        return sum + (prop.rent - feeAmount);
      }, 0);
  };

  // Handle property selection for owner payment
  const togglePropertySelection = (id: number) => {
    setSelectedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id) 
        : [...prev, id]
    );
  };

  // Handle payment reminder submission
  const handleSendReminder = (tenant: string) => {
    toast({
      title: "Relance envoyée",
      description: `La relance a été envoyée à ${tenant}`,
    });
  };

  // Rendu des badges de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "payé":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Payé</Badge>;
      case "retard":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">En retard</Badge>;
      case "à venir":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">À venir</Badge>;
      case "encaissé":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Encaissé</Badge>;
      case "à restituer":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">À restituer</Badge>;
      case "effectué":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Effectué</Badge>;
      case "en attente":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Render status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "payé":
        return <Check className="h-5 w-5 text-green-600" />;
      case "retard":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Paiements</h1>
            <p className="text-muted-foreground">
              Gérez tous les flux financiers de vos biens
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir
            </Button>
          </div>
        </div>

        {/* Stats des paiements */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Loyers encaissés (mois)</p>
                  <p className="text-3xl font-bold">6 200 €</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux d'impayés</p>
                  <p className="text-3xl font-bold">4,2%</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Versements propriétaires</p>
                  <p className="text-3xl font-bold">4 500 €</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="loyers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="loyers">Loyers perçus</TabsTrigger>
            <TabsTrigger value="depots">Dépôts de garantie</TabsTrigger>
            <TabsTrigger value="versements">Versements propriétaires</TabsTrigger>
            <TabsTrigger value="exports">Exports comptables</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyers" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Rechercher par locataire ou bien..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:w-1/4">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="payé">Payé</option>
                  <option value="retard">En retard</option>
                  <option value="à venir">À venir</option>
                </select>
              </div>
              <Button 
                variant="outline" 
                onClick={toggleSortDirection}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Tri: {sortDirection === "asc" ? "Ancien → Récent" : "Récent → Ancien"}
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bien</TableHead>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Date paiement</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRentPayments.length > 0 ? (
                      filteredRentPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.property}</TableCell>
                          <TableCell className="font-medium">{payment.tenant}</TableCell>
                          <TableCell>{payment.amount} €</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(payment.status)}
                              {getStatusBadge(payment.status)}
                            </div>
                          </TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>{payment.paymentDate || "-"}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" disabled={payment.status !== "payé"}>
                                <FileText className="mr-2 h-4 w-4" />
                                Quittance
                              </Button>
                              {payment.status === "retard" && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Send className="mr-2 h-4 w-4" />
                                      Relancer
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Relance de paiement</DialogTitle>
                                      <DialogDescription>
                                        Envoyez une relance au locataire pour le paiement en retard.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm font-medium mb-1">Destinataire</p>
                                        <div className="flex items-center p-2 bg-gray-50 rounded-md">
                                          <span>{payment.tenant}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-1">Sujet</p>
                                        <div className="p-2 bg-gray-50 rounded-md">
                                          Rappel de paiement de loyer - {payment.dueDate}
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-1">Message</p>
                                        <Textarea
                                          defaultValue={`Bonjour ${payment.tenant},\n\nNous n'avons pas encore reçu votre paiement de loyer pour le mois de ${payment.dueDate.split("/")[1]}/${payment.dueDate.split("/")[2]} d'un montant de ${payment.amount} €.\n\nNous vous prions de bien vouloir régulariser la situation dans les plus brefs délais.\n\nCordialement,\nVotre agence immobilière`}
                                          className="min-h-[200px]"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={() => handleSendReminder(payment.tenant)}>
                                        Envoyer le message
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Aucun paiement ne correspond à votre recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Dépôts de garantie */}
          <TabsContent value="depots" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Bien</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Restituer ?</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {updatedDeposits.map((deposit) => (
                      <TableRow key={deposit.id}>
                        <TableCell className="font-medium">{deposit.tenant}</TableCell>
                        <TableCell>{deposit.property}</TableCell>
                        <TableCell>{deposit.amount} €</TableCell>
                        <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                        <TableCell>{deposit.date}</TableCell>
                        <TableCell>
                          <Switch
                            checked={deposit.shouldReturn}
                            onCheckedChange={() => toggleDepositReturn(deposit.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Versements propriétaires */}
          <TabsContent value="versements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Générer un bordereau de versement</CardTitle>
                <CardDescription>Sélectionnez les biens pour calculer automatiquement le montant à verser</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Propriétaire</TableHead>
                          <TableHead>Bien</TableHead>
                          <TableHead>Loyer</TableHead>
                          <TableHead>Honoraires (%)</TableHead>
                          <TableHead>Montant net</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ownerProperties.map((property) => {
                          const netAmount = property.rent - (property.rent * property.fee / 100);
                          return (
                            <TableRow key={property.id}>
                              <TableCell>
                                <input 
                                  type="checkbox" 
                                  checked={selectedProperties.includes(property.id)}
                                  onChange={() => togglePropertySelection(property.id)}
                                  className="rounded border-gray-300"
                                />
                              </TableCell>
                              <TableCell>{property.owner}</TableCell>
                              <TableCell>{property.name}</TableCell>
                              <TableCell>{property.rent} €</TableCell>
                              <TableCell>{property.fee}%</TableCell>
                              <TableCell>{netAmount.toFixed(2)} €</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium">Total à verser</p>
                      <p className="text-2xl font-bold">{calculateTotalAmount().toFixed(2)} €</p>
                    </div>
                    <Button disabled={selectedProperties.length === 0}>
                      <FileText className="mr-2 h-4 w-4" />
                      Générer le bordereau
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Historique des versements</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Biens</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ownerPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.owner}</TableCell>
                        <TableCell>{payment.amount} €</TableCell>
                        <TableCell>{payment.properties}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Bordereau
                            </Button>
                            {payment.status === "en attente" && (
                              <Button variant="outline" size="sm">
                                Effectuer
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Exports comptables */}
          <TabsContent value="exports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exports comptables</CardTitle>
                <CardDescription>Générateur de rapports pour votre comptabilité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Période</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Septembre 2023</option>
                        <option>Août 2023</option>
                        <option>Juillet 2023</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type de rapport</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Rapport de loyers</option>
                        <option>Bordereaux propriétaires</option>
                        <option>Déclaration fiscale</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Format</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>PDF</option>
                        <option>CSV</option>
                        <option>Excel</option>
                      </select>
                    </div>
                  </div>
                  
                  {loading && (
                    <div className="space-y-2">
                      <Progress value={progress} />
                      <p className="text-sm text-center text-muted-foreground">
                        Génération du rapport en cours... {progress}%
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button 
                  className="hover:bg-gray-200 rounded px-3 py-1"
                  onClick={() => handleExport("PDF")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exporter en PDF
                </Button>
                <Button 
                  className="hover:bg-gray-200 rounded px-3 py-1" 
                  variant="outline"
                  onClick={() => handleExport("CSV")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exporter en CSV
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Rapport de loyers - Août 2023</p>
                          <p className="text-sm text-muted-foreground">Généré le 05/09/2023</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-gray-200 rounded px-3 py-1"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rapports programmés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bordereaux propriétaires</p>
                        <p className="text-sm text-muted-foreground">Tous les 5 du mois</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rapport de loyers</p>
                        <p className="text-sm text-muted-foreground">Tous les 30 du mois</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Actif</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Gérer les rapports programmés</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Payments;
