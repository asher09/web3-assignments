import { ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirDrop } from './components/RequestAirDrop';
import { ShowBalance } from './components/ShowBalance';
import { SendTokens } from './components/SendTokens';
import { SignMessage } from './components/SignMessage';

function App() {

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"} config={{disableRetryOnRateLimit: true}} >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ height:"100vh" , display: "flex", flexDirection:"column", gap: "30px", justifyContent: "center", alignItems: "center"}} >
            <WalletMultiButton />
            <RequestAirDrop />
            <ShowBalance />
            <SendTokens />
            <SignMessage />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  )
}

export default App
