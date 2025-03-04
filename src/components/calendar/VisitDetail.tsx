
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Visit } from "@/types/visit";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock, Home, Mail, MapPin, Phone, User } from "lucide-react";

interface VisitDetailProps {
  visit: Visit | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (visit: Visit) => void;
  onDelete: (visitId: number) => void;
}

const VisitDetail = ({
  visit,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: VisitDetailProps) => {
  if (!visit) return null;

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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEEE d MMMM yyyy", { locale: fr });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails de la visite</span>
            {getStatusBadge(visit.status)}
          </DialogTitle>
          <DialogDescription>
            Visite pour {visit.clientName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{visit.propertyTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {visit.propertyAddress}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(visit.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{visit.time}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Agent: {visit.agentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">ID bien: {visit.propertyId}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-2">Informations client</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{visit.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{visit.clientEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{visit.clientPhone}</span>
              </div>
            </div>
          </div>

          {visit.notes && (
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Notes</h4>
              <p className="text-sm">{visit.notes}</p>
            </div>
          )}
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button variant="secondary" onClick={() => onEdit(visit)}>
            Modifier
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(visit.id);
              onClose();
            }}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VisitDetail;
