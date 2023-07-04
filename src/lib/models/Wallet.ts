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

export class Wallet {
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

  setNFTContract(address: string, abi: string): void {
    this._nftContract = new ethers.Contract(address, abi, this._provider)
  }

  async fetchNFTs(): Promise<any> {
    let all: Metadata[] = []
    let owned: Metadata[] = []

    let totalSupply = await this._nftContract.totalSupply()
    totalSupply = totalSupply.toString() as number

    for (let i = 1; i <= totalSupply; i++) {
      let tokenURI = await this._nftContract.tokenURI(i)
      if (tokenURI.startsWith('ipfs://')) {
        tokenURI = tokenURI.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
      }
      const response = await fetch(tokenURI)
      const metadata: Metadata = await response.json()
      all.push(metadata)

      let address = await this._nftContract.ownerOf(i)
      if (address.toUpperCase() === this.account.toUpperCase()) {
        owned.push(metadata)
      }
    }

    return {
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
