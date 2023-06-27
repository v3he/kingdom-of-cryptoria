import { SmartContract } from './ SmartContract'
import type { NFT } from './NFT'
import type { JsonRpcSigner } from 'ethers'

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
    console.log('marketplace addr ::', this.address)
    console.log('nfts addr ::', this.nft.address)
    console.log('currency addr ::', this.currency.address)
	}

  async mint(nfts: NFT[]): Promise<void> {
    for(const nft of nfts) {
      (await this.nft.contract.safeMint(this.signer.address, nft.metadata)).wait()
    }
  }

}
