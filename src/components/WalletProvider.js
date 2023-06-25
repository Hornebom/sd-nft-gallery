import React from 'react'

import { Mainnet, DAppProvider, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

export function WalletProvider({ children }) {
  return <DAppProvider config={config}>{children}</DAppProvider>
}
