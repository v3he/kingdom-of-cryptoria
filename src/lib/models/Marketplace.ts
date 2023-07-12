import type { NFT } from './NFT'

import { createNFT, createSellOrder } from '$lib/server/db'
import { SmartContract } from './ SmartContract'
import type { ContractTransactionReceipt, JsonRpcSigner, LogDescription } from 'ethers'
import { MarketplaceEvent } from '$lib/types/MarketplaceEvents'

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
    await (await this.nft.contract.setApprovalForAll(this.address, true)).wait()
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

      const owner: string = log?.args[1]
      const nftID: number = log?.args[2].toString() as number

      createNFT(owner, nftID, nft.metadata)

      if (address == this.signer.address) {
        await (await this.contract.postSellOrder(nftID, Math.floor(Math.random() * 15) + 1)).wait()
      }
    }
  }

  private startEventListener(): void {
    this.contract.on(MarketplaceEvent.SELL_ORDER_LISTED, (owner, id, amount) => {
      createSellOrder({ owner, nftID: id, amount })
    })
  }
}
