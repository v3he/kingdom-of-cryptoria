import type { JsonRpcSigner } from 'ethers'
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
		super.deploy(compileOutput, this.signer)
	}

}
