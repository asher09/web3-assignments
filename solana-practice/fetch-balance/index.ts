import {Connection, PublicKey, LAMPORTS_PER_SOL} from '@solana/web3.js';
import {airdrop} from '../airdrop'

export const fetchBalance = async (publicKey: PublicKey) => {
    const connection = new Connection('http://localhost:8899', 'confirmed');
    const response = await connection.getAccountInfo(publicKey);
    return response ? response.lamports / LAMPORTS_PER_SOL : 0;
}


// to log balance and airdrop
// (async () => {
//     const publicKey = "your-public-key"
//     const bal = await fetchBalance(new PublicKey(publicKey))
//     console.log(`Balance: ${bal} SOL for ${publicKey}`);
//     await airdrop(publicKey, 10);
//     const updatedBal = await fetchBalance(new PublicKey(publicKey))
//     console.log(`Updated balance: ${updatedBal}`);

// })()
