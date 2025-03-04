
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inscription réussie !");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>
            {step === 1
              ? "Choisissez votre type de profil"
              : "Complétez vos informations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RegisterForm
              userType={userType}
              setUserType={setUserType}
              onSubmit={handleSubmit}
              onLogin={() => navigate("/auth/login")}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
