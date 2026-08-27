import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function SendTokens () {

    const {connection} = useConnection();
    const wallet = useWallet();

    async function sendToken() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert(`Sent ${amount} SOL to ${to}`);
    }

    return <div>
        <div>
            <input id="to" type="text" placeholder="To"/>
            <input id="amount" type="text" placeholder="Amount" />
        </div>
        <button onClick={sendToken}> Send </button>
    </div>
}