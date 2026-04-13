import { useState } from 'react'
import './App.css'
import {generateMnemonic} from "bip39"
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';

export default function App() {
  const [mnemonic, setMnemonic] = useState("");

  async function handleMnemonic() {
    const mn = await generateMnemonic();
    setMnemonic(mn);    
  }
  const mnemonicWords = mnemonic.split(' ');

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', gap:'50px'}} >

        <div style={{display: 'grid', flexDirection: 'column', gap: '10px'}} >
          <div>
            <button onClick={handleMnemonic} >Create Seed Phrase</button>
          </div>
          <br/>
          <div style={{display: 'flex', justifyContent:'center'}} >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontFamily: 'monospace',
              height: '250px',
              width: '400px'
            }}>
              {Array.from({ length: 12 }).map((_, index) => (
                <div 
                  key ={index}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }}>
                    <div style={{fontWeight: 'bold'}} >{mnemonicWords[index]}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      
      <div 
        style={{display: 'flex', gap:'50px'}}
      >
        <div>
          <SolanaWallet 
            mnemonic={mnemonic}  
          />  
        </div>
        <div>
          <EthWallet  
            mnemonic={mnemonic}
          />
        </div>
      </div>

      </div>
    </>
  )
}

