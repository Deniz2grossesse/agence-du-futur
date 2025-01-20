import { Building2, MapPin, BedDouble, Bath, Square } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Villa Moderne",
    address: "123 Avenue des Champs-Élysées, Paris",
    price: 850000,
    type: "Maison",
    bedrooms: 4,
    bathrooms: 2,
    surface: 180,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  {
    id: 2,
    title: "Appartement Haussmannien",
    address: "45 Rue du Commerce, Lyon",
    price: 450000,
    type: "Appartement",
    bedrooms: 3,
    bathrooms: 1,
    surface: 95,
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840"
  },
  {
    id: 3,
    title: "Loft Design",
    address: "78 Rue de la République, Marseille",
    price: 320000,
    type: "Loft",
    bedrooms: 2,
    bathrooms: 1,
    surface: 85,
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2"
  },
  {
    id: 4,
    title: "Maison de Ville",
    address: "12 Rue Victor Hugo, Bordeaux",
    price: 580000,
    type: "Maison",
    bedrooms: 5,
    bathrooms: 3,
    surface: 200,
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833"
  }
];

const Properties = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Propriétés</h1>
        <Button>
          <Building2 className="mr-2" />
          Ajouter une propriété
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{property.title}</CardTitle>
                <Badge>{property.type}</Badge>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {property.address}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary">
                  {property.price.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <div className="flex items-center">
                  <BedDouble className="w-4 h-4 mr-1" />
                  {property.bedrooms} ch.
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  {property.bathrooms} sdb.
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  {property.surface} m²
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Détails</Button>
              <Button>Contacter</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Properties;