import type { BrowserProvider } from 'ethers'

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
  provider: BrowserProvider

  get account(): string {
    return this.accounts[0]
  }

  async isConnected() {
    this.accounts = await window.ethereum.request({ method: 'eth_accounts' })
    return this.accounts.length > 0
  }

  setAccounts(accounts: string[]): void {
    this.accounts = accounts
  }

  setProvider(provider: BrowserProvider): void {
    this.provider = provider
  }

  async promptChainCreation() {
    await window.ethereum
      .request({ method: 'wallet_addEthereumChain', params: [chainOptions] })
      .catch((error: MetaMaskError) => console.log(error))
  }

  startEventListeners(): void {
    window.ethereum.on('accountsChanged', () => window.location.reload())
  }
}
