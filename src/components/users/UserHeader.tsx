
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const UserHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez les utilisateurs de la plateforme
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un utilisateur
      </Button>
    </div>
  );
};

export default UserHeader;
