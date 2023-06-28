export class NFT {

	metadata: string

	constructor(metadata: string) {
		this.metadata = `ipfs://${metadata}`
	}

}
