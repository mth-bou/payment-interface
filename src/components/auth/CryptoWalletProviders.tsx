import { useState } from "react";
import { useSyncProviders } from "@/hooks/useSyncProviders.ts";
import { formatAddress } from "@/utils";
import { Button } from "@/components/ui/button.tsx";

interface CryptoWalletProvidersProps {
  onConnect: (providerWithInfo: EIP6963ProviderDetail) => void;
}

export const CryptoWalletProviders = ({ onConnect }: CryptoWalletProvidersProps) => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [userAccount, setUserAccount] = useState<string>("");
  const providers = useSyncProviders();

  // Connect to the selected provider using eth_requestAccounts.
  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
      onConnect(providerWithInfo);
    } catch (error) {
      console.error(error);
    }
  }

  // Display detected providers as connect buttons.
  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {
          providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
              <Button
                key={provider.info.uuid}
                onClick={() => handleConnect(provider)}
                className="w-full mt-2"
              >
                <img src={provider.info.icon} alt={provider.info.name} width={30} height={30} />
                <div>{provider.info.name}</div>
              </Button>
            )) :
            <div>
              No Announced Wallet Providers
            </div>
        }
      </div>
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount &&
        <div>
            <div>
                <img src={selectedWallet?.info.icon} alt={selectedWallet?.info.name} />
                <div>{selectedWallet?.info.name}</div>
                <div>({formatAddress(userAccount)})</div>
            </div>
        </div>
      }
    </>
  )
}
