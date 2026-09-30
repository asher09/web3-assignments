import  { VersionedTransaction } from '@solana/web3.js';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import axios from 'axios';
import { Buffer } from 'node:buffer';
import { useState } from 'react';
// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.


export function Swap() {

    const {connection } = useConnection();
    const wallet =  useWallet();

    const [solAmount, setSolAmount] = useState("");
    const [usdcAmount, setUsdcAmount] = useState("");

    async function getQuote(amount) {
        
        if(!amount || Number(amount) <=0 ) {
            setUsdcAmount("");
            return;
        }

        try{
            const response = await axios.get(
                `https://lite-api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${Number(amount) * 1000000000}&slippageBps=50`
            );
            const usdc = Number(response.data.outAmount) / 1000000;

            setUsdcAmount(usdc.toFixed(6));
        } catch(error) {
            console.log("Quote Failed", error);
        }

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            minHeight: "100vh",
            padding: "24px",
            boxSizing: "border-box",
            }}      
        >
            <h1>Swap SOL for USDC</h1>
            <div 
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                }}
            >
                <label>SOL</label>
                <input
                    type="number"
                    min="0"
                    placeholder="SOL amount"
                    value={solAmount}
                    onChange={(event) => {
                        setSolAmount(event.target.value);
                        getQuote(event.target.value);
                    }}
                    style={{
                        width: "150px",
                        padding: "6px"
                    }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap:"8px",
                }}
            >
                <label>USDC</label>
                <input
                    id="outputAmount"
                    type="text"
                    placeholder="Estimated USDC"
                    value={usdcAmount}
                    readOnly
                    style={{
                        width: "150px",
                        padding: "6px"
                    }}
                />
            </div>
            <button 
                onClick={swapTokens}
                style={{
                    width: "220px",
                    padding: "10px 16px",
                    marginTop: "4px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                SWAP
            </button>
        </div>
    )
}