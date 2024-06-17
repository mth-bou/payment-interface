import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import LogoutButton from "@/components/auth/LogoutButton.tsx";
import ProfileInformations from "@/components/auth/ProfileInformations.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import LoginModal from "@/components/auth/LoginModal.tsx";

const Header = () => {
  const { isAuthenticated} = useAuth();

  return (
    <header className="bg-background w-full p-4 text-white border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">Payment Interface</h1>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileInformations />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex justify-center">
              <LogoutButton/>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex align-middle">
            <p className="text-muted-foreground mr-2 self-center">Credentials : Satoshi Nakamoto</p>
            <LoginModal />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
