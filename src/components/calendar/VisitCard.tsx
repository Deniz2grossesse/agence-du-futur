
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Visit } from "@/types/visit";
import { Clock, Home, MapPin, User, Calendar } from "lucide-react";

interface VisitCardProps {
  visit: Visit;
  onClick: (visit: Visit) => void;
}

const VisitCard = ({ visit, onClick }: VisitCardProps) => {
  const getStatusBadge = (status: Visit["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline">Planifiée</Badge>;
      case "confirmed":
        return <Badge variant="default">Confirmée</Badge>;
      case "completed":
        return <Badge variant="secondary">Terminée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return null;
    }
  };

  // Affichage spécifique pour les créneaux de disponibilité
  if (visit.isAvailabilitySlot) {
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow bg-blue-50"
        onClick={() => onClick(visit)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium truncate mr-2">{visit.time}</div>
            <Badge variant="outline" className="bg-blue-100">Disponibilité</Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{visit.agentName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{visit.date}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Affichage standard pour les visites
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(visit)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium truncate mr-2">{visit.time}</div>
          {getStatusBadge(visit.status)}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{visit.propertyTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{visit.propertyAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{visit.clientName}</span>
          </div>
          {visit.mobileAgentName && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <span className="truncate text-blue-500">{visit.mobileAgentName}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitCard;
