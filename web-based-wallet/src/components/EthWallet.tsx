
import { useState } from 'react';
import {mnemonicToSeed} from 'bip39';
import {HDNodeWallet, Wallet} from "ethers";

export function EthWallet({mnemonic} : {mnemonic: string}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState<string[]>([]);

    async function handleSolanaWallet() {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex+1);
        setAddresses([...addresses, wallet.address]);
    }

    return (
        <>
            <button 
                onClick={handleSolanaWallet}
            > 
                Add ETH Wallet 
            </button>
            {addresses.map((address, index) =>
                <div key={index} > Eth - {address}</div>
            )}
        </>
    )
}