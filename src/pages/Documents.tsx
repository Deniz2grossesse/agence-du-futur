
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Download, FileText, FilePlus, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

// Type pour les documents
type DocumentStatus = "valide" | "expiré" | "à signer" | "brouillon";
type DocumentType = "bail" | "état des lieux" | "quittance" | "diagnostic" | "règlement" | "assurance" | "autre";

interface Document {
  id: number;
  title: string;
  type: DocumentType;
  property?: string;
  tenant?: string;
  owner?: string;
  dateCreated: string;
  dateExpiration?: string;
  status: DocumentStatus;
  fileSize: string;
  lastModified: string;
}

// Données factices pour les documents
const documents: Document[] = [
  {
    id: 1,
    title: "Bail - Appartement T3 Paris",
    type: "bail",
    property: "Appartement T3 - Paris 9e",
    tenant: "Sophie Martin",
    owner: "Jean Dupont",
    dateCreated: "15/03/2023",
    dateExpiration: "14/03/2026",
    status: "valide",
    fileSize: "2.4 MB",
    lastModified: "15/03/2023"
  },
  {
    id: 2,
    title: "État des lieux d'entrée - Studio Lyon",
    type: "état des lieux",
    property: "Studio - Lyon 3e",
    tenant: "Thomas Dubois",
    owner: "Marie Richard",
    dateCreated: "10/08/2022",
    status: "valide",
    fileSize: "3.1 MB",
    lastModified: "10/08/2022"
  },
  {
    id: 3,
    title: "Quittance loyer Août 2023 - T3 Paris",
    type: "quittance",
    property: "Appartement T3 - Paris 9e",
    tenant: "Sophie Martin",
    dateCreated: "31/08/2023",
    status: "valide",
    fileSize: "0.5 MB",
    lastModified: "31/08/2023"
  },
  {
    id: 4,
    title: "Diagnostic énergétique - Maison Nice",
    type: "diagnostic",
    property: "Maison T4 - Nice",
    owner: "Jean Dupont",
    dateCreated: "05/02/2023",
    dateExpiration: "04/02/2030",
    status: "valide",
    fileSize: "4.2 MB",
    lastModified: "05/02/2023"
  },
  {
    id: 5,
    title: "Avenant bail - Loft Bordeaux",
    type: "bail",
    property: "Loft - Bordeaux",
    tenant: "Lucas Moreau",
    owner: "Marie Richard",
    dateCreated: "20/07/2023",
    status: "à signer",
    fileSize: "1.7 MB",
    lastModified: "20/07/2023"
  },
  {
    id: 6,
    title: "Attestation assurance habitation - T2 Nantes",
    type: "assurance",
    property: "Appartement T2 - Nantes",
    tenant: "Chloé Roux",
    dateCreated: "15/05/2022",
    dateExpiration: "14/05/2023",
    status: "expiré",
    fileSize: "0.8 MB",
    lastModified: "15/05/2022"
  }
];

// Templats de documents
const documentTemplates = [
  { id: 1, name: "Contrat de bail résidentiel", type: "bail", description: "Contrat de bail standard pour logements résidentiels" },
  { id: 2, name: "État des lieux", type: "état des lieux", description: "Formulaire d'état des lieux d'entrée et de sortie" },
  { id: 3, name: "Quittance de loyer", type: "quittance", description: "Quittance mensuelle pour le paiement des loyers" },
  { id: 4, name: "Avenant au bail", type: "bail", description: "Modification d'un contrat de bail existant" },
  { id: 5, name: "Lettre de relance loyer", type: "autre", description: "Modèle de relance pour loyers impayés" },
  { id: 6, name: "Résiliation de bail", type: "bail", description: "Document de résiliation pour fin de contrat" }
];

const Documents = () => {
  const [activeTab, setActiveTab] = useState("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("tous");
  const [statusFilter, setStatusFilter] = useState("tous");

  // Filtrer les documents selon la recherche et les filtres
  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (document.property && document.property.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (document.tenant && document.tenant.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (document.owner && document.owner.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "tous" || document.type === typeFilter;
    const matchesStatus = statusFilter === "tous" || document.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Rendu des badges de statut
  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "valide":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Valide</Badge>;
      case "expiré":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Expiré</Badge>;
      case "à signer":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">À signer</Badge>;
      case "brouillon":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Rendu des badges de type
  const getTypeBadge = (type: DocumentType) => {
    switch (type) {
      case "bail":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200">Bail</Badge>;
      case "état des lieux":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">État des lieux</Badge>;
      case "quittance":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Quittance</Badge>;
      case "diagnostic":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Diagnostic</Badge>;
      case "règlement":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Règlement</Badge>;
      case "assurance":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-200">Assurance</Badge>;
      case "autre":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">Autre</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">
              Gérez tous vos documents locatifs et contractuels
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" />
              Nouveau document
            </Button>
          </div>
        </div>

        {/* Stats des documents */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Documents valides</p>
                  <p className="text-3xl font-bold">{documents.filter(d => d.status === "valide").length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">À signer</p>
                  <p className="text-3xl font-bold">{documents.filter(d => d.status === "à signer").length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expirés</p>
                  <p className="text-3xl font-bold">{documents.filter(d => d.status === "expiré").length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">À expirer (30j)</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tous" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tous">Tous les documents</TabsTrigger>
            <TabsTrigger value="generer">Générer un document</TabsTrigger>
            <TabsTrigger value="archivage">Archivage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tous" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Rechercher un document par titre, bien, locataire..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:w-1/5">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="tous">Tous les types</option>
                  <option value="bail">Bail</option>
                  <option value="état des lieux">État des lieux</option>
                  <option value="quittance">Quittance</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="assurance">Assurance</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="md:w-1/5">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="valide">Valide</option>
                  <option value="expiré">Expiré</option>
                  <option value="à signer">À signer</option>
                  <option value="brouillon">Brouillon</option>
                </select>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Bien/Parties</TableHead>
                      <TableHead>Date création</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="font-medium">{document.title}</TableCell>
                          <TableCell>{getTypeBadge(document.type)}</TableCell>
                          <TableCell>
                            <div>
                              {document.property && <div>{document.property}</div>}
                              {document.tenant && <div className="text-sm text-muted-foreground">Locataire: {document.tenant}</div>}
                              {document.owner && <div className="text-sm text-muted-foreground">Propriétaire: {document.owner}</div>}
                            </div>
                          </TableCell>
                          <TableCell>{document.dateCreated}</TableCell>
                          <TableCell>{getStatusBadge(document.status)}</TableCell>
                          <TableCell>{document.fileSize}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              {document.status === "à signer" && (
                                <Button variant="outline" size="sm">Signer</Button>
                              )}
                              <Button variant="outline" size="sm">Détails</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Aucun document ne correspond à votre recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Générer un document */}
          <TabsContent value="generer" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sélection du template</CardTitle>
                  <CardDescription>
                    Choisissez le type de document à générer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentTemplates.map((template) => (
                      <div key={template.id} className="flex items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                        <FileText className="h-8 w-8 mr-4 text-primary" />
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations du document</CardTitle>
                  <CardDescription>
                    Complétez les champs pour générer votre document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Type de document</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>-- Sélectionnez un template --</option>
                        {documentTemplates.map((t) => (
                          <option key={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Bien concerné</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>-- Sélectionnez un bien --</option>
                        <option>Appartement T3 - Paris 9e</option>
                        <option>Studio - Lyon 3e</option>
                        <option>Maison T4 - Nice</option>
                        <option>Loft - Bordeaux</option>
                        <option>Appartement T2 - Nantes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Locataire</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>-- Sélectionnez un locataire --</option>
                        <option>Sophie Martin</option>
                        <option>Thomas Dubois</option>
                        <option>Emma Petit</option>
                        <option>Lucas Moreau</option>
                        <option>Chloé Roux</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Propriétaire</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>-- Sélectionnez un propriétaire --</option>
                        <option>Jean Dupont</option>
                        <option>Marie Richard</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Date de début</label>
                      <Input type="date" className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Options</label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="signature" className="mr-2" />
                          <label htmlFor="signature">Signature électronique</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="notification" className="mr-2" />
                          <label htmlFor="notification">Envoyer une notification</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Aperçu</Button>
                  <Button>Générer le document</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Archivage */}
          <TabsContent value="archivage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Archivage des documents</CardTitle>
                <CardDescription>
                  Consultez et récupérez vos documents archivés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Année</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>2023</option>
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">Type de document</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="tous">Tous les types</option>
                        <option value="bail">Bail</option>
                        <option value="état des lieux">État des lieux</option>
                        <option value="quittance">Quittance</option>
                        <option value="diagnostic">Diagnostic</option>
                        <option value="assurance">Assurance</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">Bien</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Tous les biens</option>
                        <option>Appartement T3 - Paris 9e</option>
                        <option>Studio - Lyon 3e</option>
                        <option>Maison T4 - Nice</option>
                        <option>Loft - Bordeaux</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button>Rechercher</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 text-center bg-muted/10">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Sélectionnez des critères pour retrouver vos documents archivés
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Politique de conservation</CardTitle>
                <CardDescription>
                  Règles de conservation et d'archivage des documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border-b">
                    <div>
                      <p className="font-medium">Contrats de bail</p>
                      <p className="text-sm text-muted-foreground">Durée de conservation: 5 ans après la fin du bail</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b">
                    <div>
                      <p className="font-medium">Quittances de loyer</p>
                      <p className="text-sm text-muted-foreground">Durée de conservation: 5 ans</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b">
                    <div>
                      <p className="font-medium">États des lieux</p>
                      <p className="text-sm text-muted-foreground">Durée de conservation: 5 ans après la fin du bail</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <div>
                      <p className="font-medium">Diagnostics techniques</p>
                      <p className="text-sm text-muted-foreground">Durée de conservation: 10 ans</p>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
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

// Composant Upload pour l'icône
const Upload = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default Documents;
