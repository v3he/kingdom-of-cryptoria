import type { Marketplace } from './Marketplace'
import type { Metadata } from '$lib/types/Metadata'

import { ethers, type BrowserProvider, Contract } from 'ethers'

let chainOptions = {
  chainId: '0x15B3',
  chainName: 'Kingdom Of Cryptoria',
  rpcUrls: ['http://127.0.0.1:8545'],
  iconUrls: [],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://etherscan.io']
}

let tokenOptions = {
  type: 'ERC20',
  options: {
    address: '',
    symbol: 'EST',
    decimals: 18,
    image: 'https://foo.io/token-image.svg'
  }
}

export class Wallet {
  nfts: Metadata[]
  accounts: string[] = []
  marketplace: Marketplace

  private _provider: BrowserProvider
  private _nftContract: Contract

  get account(): string {
    return this.accounts[0]?.toLowerCase()
  }

  async isConnected() {
    this.accounts = await window.ethereum.request({ method: 'eth_accounts' })
    return this.accounts.length > 0
  }

  setProvider(provider: BrowserProvider): void {
    this._provider = provider
    this.startEventListeners()
  }

  async setNFTContract(address: string, abi: string): Promise<void> {
    this._nftContract = new ethers.Contract(address, abi, this._provider)
  }

  private startEventListeners(): void {
    window.ethereum.on('accountsChanged', () => window.location.reload())
  }

  async promptChainCreation() {
    await window.ethereum
      .request({ method: 'wallet_addEthereumChain', params: [chainOptions] })
      .catch((error: MetaMaskError) => console.log(error))
  }

  async promptTokenCreation(token: string) {
    tokenOptions.options.address = token
    await window.ethereum
      .request({ method: 'wallet_watchAsset', params: tokenOptions })
      .catch((error: MetaMaskError) => console.log(error))
  }
}
