import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { Swap } from "./components/Swap";
import {WalletModalProvider, WalletMultiButton} from '@solana/wallet-adapter-react-ui'
import "@solana/wallet-adapter-react-ui/styles.css"


function App() {

    return (
        <ConnectionProvider endpoint="https://api.mainnet.solana.com">
            <WalletProvider wallets={[]}  autoConnect>
                
                <WalletModalProvider>
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "12px",
                            boxSizing: "border-box",
                        }}
                    >
                        <WalletMultiButton />    
                    </div>
                
                    <Swap />
                </div>
                </WalletModalProvider>

            </WalletProvider>
        </ConnectionProvider>
    )
}

export default App;