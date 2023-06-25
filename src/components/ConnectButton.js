import React from 'react'
import { useEthers } from '@usedapp/core'

export function ConnectButton() {
  const { account, deactivate, activateBrowserWallet } = useEthers()

  function handleClick() {
    account ? deactivate() : activateBrowserWallet()
  }

  return <button onClick={handleClick}>{account ? 'Disconnect' : 'Connect'}</button>
}
