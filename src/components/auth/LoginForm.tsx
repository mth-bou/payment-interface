import { useState } from 'react';
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { CryptoWalletProviders } from "@/components/auth/CryptoWalletProviders.tsx";

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, error } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    await login(username, password);
    setIsLoading(false);
  };

  const handleWalletConnect = (provider: EIP6963ProviderDetail) => {
    console.log(`Connected to wallet: ${provider.info.name}`);
    // Handle wallet connect logic here
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Login</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your username below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-foreground">Username</Label>
          <Input
            id="email"
            type="email"
            placeholder="Barack Obama"
            className="bg-background border-input text-foreground"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-foreground">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-background border-input text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-destructive text-sm font-medium">{error}</p>}
        <Button
          onClick={handleLogin}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Login'}
        </Button>
        <CryptoWalletProviders onConnect={handleWalletConnect} />
      </div>
    </div>
  );
};

export default LoginForm;