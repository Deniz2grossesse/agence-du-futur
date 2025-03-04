
import { Card, CardContent } from "@/components/ui/card";
import { Visit } from "@/types/visit";
import { format, getDay, getDaysInMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import VisitCard from "./VisitCard";

interface CalendarGridProps {
  currentDate: Date;
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
}

const CalendarGrid = ({ currentDate, visits, onVisitClick }: CalendarGridProps) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayOfWeek = getDay(firstDayOfMonth);
  
  // Noms des jours de la semaine en français
  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  
  // Ajuster pour commencer la semaine par lundi (0) au lieu de dimanche (6)
  const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Création d'un tableau avec les jours du mois
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Filtrer les visites pour chaque jour
  const getVisitsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return visits.filter(visit => {
      const visitDate = new Date(visit.date);
      return isSameDay(visitDate, date);
    });
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* En-têtes des jours de la semaine */}
      {weekDays.map((day, index) => (
        <div 
          key={`header-${index}`} 
          className="text-center py-2 font-medium text-sm text-muted-foreground"
        >
          {day}
        </div>
      ))}
      
      {/* Espaces vides pour les jours avant le début du mois */}
      {Array.from({ length: adjustedStartingDay }).map((_, index) => (
        <div key={`empty-${index}`} className="aspect-square" />
      ))}
      
      {/* Jours du mois avec leurs visites */}
      {days.map(day => {
        const dayVisits = getVisitsForDay(day);
        const isToday = isSameDay(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
          new Date()
        );
        
        return (
          <Card 
            key={`day-${day}`} 
            className={`min-h-[120px] ${isToday ? 'ring-2 ring-primary' : ''}`}
          >
            <CardContent className="p-2">
              <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                {day}
              </div>
              <div className="space-y-1 max-h-[350px] overflow-y-auto">
                {dayVisits.length > 0 ? (
                  dayVisits.map(visit => (
                    <VisitCard 
                      key={visit.id} 
                      visit={visit} 
                      onClick={onVisitClick} 
                    />
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">Aucune visite</div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
