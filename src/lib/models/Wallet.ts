import { ethers, type BrowserProvider, Contract } from 'ethers'
import type { Marketplace } from './Marketplace'

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

  async getOwnedNFTs(): Promise<void> {
    // const totalSupply = await this._nftContract.totalSupply();
    // console.log(totalSupply)
    // let tokenURI = await this._nftContract.tokenURI(1)
    // if (tokenURI.startsWith('ipfs://')) {
    //   tokenURI = tokenURI.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
    // }
    // const response = await fetch(tokenURI);
    // const metadata = await response.json();
    // console.log(metadata)
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
