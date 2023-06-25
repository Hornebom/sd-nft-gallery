import * as React from 'react'
import './App.css'
import { WalletProvider } from './components/WalletProvider'
import { StoreProvider } from './store/StoreProvider'
import { ConnectButton } from './components/ConnectButton'
import { NftsCloud } from './components/NftCloud'
import { Sidebar } from './components/Sidebar'

export function App() {
  return (
    <WalletProvider>
      <StoreProvider>
        <div className="layout">
          <header>
            <ConnectButton />
          </header>
          <main className="main">
            <NftsCloud />
            <Sidebar />
          </main>
        </div>
      </StoreProvider>
    </WalletProvider>
  )
}
