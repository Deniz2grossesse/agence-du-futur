
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onAddVisit: () => void;
}

const CalendarHeader = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onAddVisit,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Calendrier des visites</h1>
        <p className="text-muted-foreground">
          Gérez les rendez-vous de visites immobilières
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </div>
          <Button variant="outline" size="icon" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onAddVisit}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle visite
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
