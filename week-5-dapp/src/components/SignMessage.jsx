import { useWallet } from "@solana/wallet-adapter-react";
import {ed25519} from '@noble/curves/ed25519.js';
import bs58 from 'bs58';


export function SignMessage() {
    
    const {publicKey, signMessage} = useWallet();

    async function signMsg() {

        const message = document.getElementById("message").value;
        const encodedMessage=  new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('Sucess', `Message signature: ${bs58.encode(signature)}`);
        console.log(`Message signature: ${bs58.encode(signature)}`);

    }

    return (
        <div>
            <input id='message' type='text' placeholder="Message" />
            <button 
                onClick={signMsg} 
            >
                Sign Message 
            </button>
        </div>
    )
}