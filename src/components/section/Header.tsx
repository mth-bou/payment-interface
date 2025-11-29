import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import LogoutButton from "@/components/auth/LogoutButton.tsx";
import ProfileInformations from "@/components/auth/ProfileInformations.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import LoginModal from "@/components/auth/LoginModal.tsx";
import { ThemeToggle } from "@/components/section/ThemeToggle.tsx";

const Header = () => {
  const { isAuthenticated} = useAuth();

  return (
    <header className="w-full p-4 border-b border-border bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl text-foreground font-semibold">Payment Interface</h1>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ProfileInformations />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex justify-center">
                <LogoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm hidden sm:block">
                Credentials: Satoshi Nakamoto
              </p>
              <LoginModal />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
