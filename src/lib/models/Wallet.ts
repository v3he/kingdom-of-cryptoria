import type { Marketplace } from './Marketplace'
import type { Metadata } from '$lib/types/Metadata'

import { ethers, type BrowserProvider, Contract } from 'ethers'

const chainOptions = {
  chainId: '0x539',
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

export class Wallet {
  nfts: Metadata[]
  accounts: string[] = []
  marketplace: Marketplace

  private _provider: BrowserProvider
  private _nftContract: Contract

  get account(): string {
    return this.accounts[0]
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
    await this.fetchNFTs()
  }

  private async fetchNFTs(): Promise<void> {
    const totalSupply = (await this._nftContract.totalSupply())?.toString() as number
    const promises = Array.from({ length: totalSupply }, (_, i) => this.fetchNFT(i + 1))
    this.nfts = (await Promise.all(promises)).filter(Boolean) as Metadata[]
  }

  private async fetchNFT(tokenId: number): Promise<Metadata | null> {
    let tokenURI = await this._nftContract.tokenURI(tokenId)

    if (tokenURI.startsWith('ipfs://')) {
      tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
    }

    const response = await fetch(tokenURI)
    const metadata: Metadata = await response.json()

    metadata.owner = await this._nftContract.ownerOf(tokenId)
    metadata.owned = metadata.owner.toUpperCase() === this.account.toUpperCase()

    return metadata
  }

  private startEventListeners(): void {
    window.ethereum.on('accountsChanged', () => window.location.reload())
  }

  async promptChainCreation() {
    await window.ethereum
      .request({ method: 'wallet_addEthereumChain', params: [chainOptions] })
      .catch((error: MetaMaskError) => console.log(error))
  }
}
