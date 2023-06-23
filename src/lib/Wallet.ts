export class Wallet {

  accounts: string[]

  constructor(accounts: string[]) {
    this.accounts = accounts
    this.startOnChangeListener()
  }

  get account(): string {
    return this.accounts[0]
  }

  isConnected(): boolean {
    return this.accounts.length > 0
  }

  async setLocalChain() {
    console.log('executed')
    const a = await window.ethereum.request({
      "method": "wallet_addEthereumChain",
      "params": [
        {
          "chainId": "0x539",
          "chainName": "Kingdom Of Cryptoria",
          "rpcUrls": [
            "http://127.0.0.1:8545"
          ],
          "iconUrls": [],
          "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18
          },
          "blockExplorerUrls": ["https://rpc.ankr.com/gnosis"]
        }
      ]
    }).catch((err:any) => console.log(err))
    console.log(a)
  }

  private startOnChangeListener(): void {
		// window.ethereum.on('accountsChanged', () => window.location.reload())
  }

}