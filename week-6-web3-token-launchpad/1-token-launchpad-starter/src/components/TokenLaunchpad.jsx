import {createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint, TOKEN_PROGRAM_ID, MINT_SIZE} from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react";
import {Transaction, SystemProgram, Keypair, Connection} from "@solana/web3.js"
import { useConnection } from "@solana/wallet-adapter-react"; 

export function TokenLaunchpad() {

    const wallet  = useWallet();
    const { connection } = useConnection();
    
    async function createToken() {
        const name = document.getElementById('name').value;
        const symbol = document.getElementById('symbol').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const initialSupply = document.getElementById('initialSupply').value;
        console.log(name, symbol, imageUrl, initialSupply);
        
        const lamports = await getMinimumBalanceForRentExemptMint(connection)
        const keypair = Keypair.generate()

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
        );

        const recentBlockhash= await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        transaction.partialSign(keypair);
        let response = await wallet.sendTransaction(transaction, connection);
        console.log(response)
    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id='name' type='text' placeholder='Name'></input> <br />
        <input id='symbol' type='text' placeholder='Symbol'></input> <br />
        <input id='imageUrl' type='text' placeholder='Image URL'></input> <br />
        <input id='initialSupply' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}