import  { VersionedTransaction } from '@solana/web3.js';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import axios from 'axios';
import { Buffer } from 'node:buffer';
// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.


export function Swap() {

    const {connection } = useConnection();
    const wallet =  useWallet();

    async function getQuote() {

    }

    async function swapTokens() {
        try{
            const response = await (
                axios.get('https://lite-api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50'
                )
            );
            const quoteResponse = response.data;
            console.log(quoteResponse);

            const { data: { swapTransaction } } = await (
                axios.post('https://lite-api.jup.ag/swap/v1/swap', {
                    quoteResponse,
                    userPublicKey: wallet.publicKey.toString(),
                })
            );

            console.log("swapTransaction")
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            console.log(transaction);
            
            const signedTransaction = await wallet.signTransaction(transaction);
            const latestBlockHash = await connection.getLatestBlockhash();

            // execute the transaction
            const rawTransaction = signedTransaction.serialize()
            const txid = await connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
                maxRetries: 2
            });
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: txid
            });
            console.log(`https://solscan.io/tx/${txid}`); 
        } catch (e) {
            console.log("Swap failed", e)
        }
    }
      
    return (
        <>
            <h1>Swap SOL for USDC</h1>
            <div>
                <label>SOL</label>
                <input
                    type="number"
                    min="0"
                    placeholder="SOL amount"
                />
            </div>
            <div>
                <label>USDC</label>
                <input
                    id="outputAmount"
                    type="text"
                    placeholder="Estimated USDC"
                    readOnly
                />
            </div>
            <button onClick={swapTokens}>
                SWAP
            </button>
        </>
    )
}