import { ethers, type BrowserProvider, Contract, type BigNumberish } from 'ethers'
import type { Marketplace } from './Marketplace'
import type { Metadata } from '$lib/types/Metadata'

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

interface NFTCollection {
  owned: Metadata[]
  collection: Metadata[]
}

export class Wallet {
  accounts: string[] = []
  marketplace: Marketplace

  nfts: NFTCollection

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
    let all: Metadata[] = []
    let owned: Metadata[] = []

    let totalSupply = await this._nftContract.totalSupply()
    totalSupply = totalSupply.toString() as number

    for (let i = 1; i <= totalSupply; i++) {
      let tokenURI = await this._nftContract.tokenURI(i)
      if (tokenURI.startsWith('ipfs://')) {
        tokenURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
      }
      const response = await fetch(tokenURI)
      const metadata: Metadata = await response.json()
      all.push(metadata)

      let address = await this._nftContract.ownerOf(i)
      metadata.owner = address
      if (address.toUpperCase() === this.account.toUpperCase()) {
        owned.push(metadata)
      }
    }

    this.nfts = {
      owned,
      collection: all
    }
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
