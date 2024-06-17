import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { Loader } from "@/components/ui/loader.tsx";
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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              type="email"
              placeholder="Barack Obama"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            onClick={handleLogin}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader size={20} /> : 'Login'}
          </Button>
          <CryptoWalletProviders onConnect={handleWalletConnect} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
