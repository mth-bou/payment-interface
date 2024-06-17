import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/context/AuthContext.tsx";

const LogoutButton = () => {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
