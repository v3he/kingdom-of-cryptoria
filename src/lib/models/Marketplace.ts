import type { NFT } from './NFT'
import type { ContractTransactionReceipt, JsonRpcSigner, LogDescription } from 'ethers'

import { createNFT } from '$lib/server/db'
import { SmartContract } from './ SmartContract'

export class Marketplace extends SmartContract {
  signer: JsonRpcSigner
  nft: SmartContract
  currency: SmartContract

  constructor(signer: JsonRpcSigner) {
    super('NFTMarketplace')

    this.signer = signer
    this.nft = new SmartContract('CryptorianRelics')
    this.currency = new SmartContract('EtherStone')
    this.dependencies = [this.currency, this.nft]
  }

  async deploy(compileOutput: any): Promise<void> {
    await super.deploy(compileOutput, this.signer)
    this.startEventListener()
  }

  async mint(nfts: NFT[], address: string = this.signer.address): Promise<void> {
    for (const nft of nfts) {

      const receipt: ContractTransactionReceipt = await (
        await this.nft.contract.safeMint(address, nft.metadata)
      ).wait()

      const log: LogDescription = receipt.logs
        .map((log) => ({ topics: [...log.topics], data: log.data }))
        .map((log) => this.nft.contract.interface.parseLog(log))
        .find((event) => event && event.name === 'Transfer')!

      createNFT(log?.args[1], log.args[2].toString() as number)

    }
  }

  private startEventListener(): void {
    this.contract.on('SellOrderListed', (owner, nftId, erc20Amount, event) => {
      console.log(`Sell order listed: 
        Owner: ${owner}
        NFT ID: ${nftId.toString()}
        ERC20 Amount: ${erc20Amount.toString()}`)
      console.log(`Event block number: ${event.blockNumber}`)
    })
  }
}
