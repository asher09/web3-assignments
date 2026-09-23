import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { Swap } from "./components/Swap";
import {WalletModalProvider, WalletMultiButton} from '@solana/wallet-adapter-react-ui'
import "@solana/wallet-adapter-react-ui/styles.css"


function App() {

    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={[]}  autoConnect>
                
                <WalletModalProvider>
                    <WalletMultiButton />
                    <Swap />
                </WalletModalProvider>

            </WalletProvider>
        </ConnectionProvider>
    )
}

export default App;