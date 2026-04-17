import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';
import { airdrop } from '../airdrop';
import { fetchBalance } from '../fetch-balance';

export const transferSol = async (from: Keypair, to: PublicKey, amount: number) => {
    const connection = new Connection('http://localhost:8899', 'confirmed');
    const transaction = new Transaction();

    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL * amount
    });

    transaction.add(instruction);
    await sendAndConfirmTransaction(connection, transaction, [
        from
    ])
    console.log("DONE")


}

const secret = Uint8Array.from([156,243,105,10,107,20,28,177,206,254,224,34,227,18,53,32,42,253,14,206,11,0,10,177,197,76,228,146,230,150,99,158,158,20,148,147,24,218,29,248,87,25,80,186,209,39,141,106,24,30,25,131,235,220,209,208,139,235,168,248,79,56,89,137])
const fromkeyPair = Keypair.fromSecretKey(secret);
const toPublickey = new PublicKey("CSj247BtMj9gUP62JunA5FTsgfVgosoRTHqEYaTYnBgY");

(async () => {
    await airdrop(fromkeyPair.publicKey, 1)
    const initBal = await fetchBalance(fromkeyPair.publicKey)
    console.log(`Initial balance of the sender's wallet is ${initBal}`)
    const finalBal = await fetchBalance(toPublickey)
    console.log(`Initial balance of hte receiver's wallet is ${finalBal}`)

    await transferSol(fromkeyPair, toPublickey, 5)
    const initBal2 = await fetchBalance(fromkeyPair.publicKey)
    console.log(`POST balance of the sender's wallet is ${initBal2}`)
    const finalBal2 = await fetchBalance(toPublickey)
    console.log(`POST balance of hte receiver's wallet is ${finalBal2}`)
})()    