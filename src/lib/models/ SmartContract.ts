import fs from 'fs'
import path from 'path'
import { BaseContract, JsonRpcSigner, ethers } from 'ethers'

export class SmartContract {
	name: string
	fullname: string
	location: string
	content: string
	abi: string
	bytecode: string
	address: string
	dependencies: SmartContract[]

	constructor(name: string, deps: SmartContract[] = []) {
		this.name = name
		this.dependencies = deps
		this.fullname = `${name}.sol`
		this.location = path.join('src/lib/contracts', this.fullname)
		this.content = fs.readFileSync(this.location, { encoding: 'utf8', flag: 'r' })
	}

	sources() {
		let sources = this.dependencies.reduce((sources, dep: SmartContract) => {
			sources[dep.fullname] = { content: dep.content }
			return sources
		}, {})
		sources[this.fullname] = { content: this.content }
		return sources
	}

	// todo: refactor this code
	async deploy(output: any, signer: JsonRpcSigner): Promise<void> {

		for(const dep of this.dependencies) {

			dep.abi = output.contracts[dep.fullname][dep.name].abi
			dep.bytecode = output.contracts[dep.fullname][dep.name].evm.bytecode.object

			const factory = new ethers.ContractFactory(dep.abi, dep.bytecode, signer)
			const contract: BaseContract = await factory.deploy()

			dep.address = contract.target as string

		}

		this.abi = output.contracts[this.fullname][this.name].abi
		this.bytecode = output.contracts[this.fullname][this.name].evm.bytecode.object
		
		// change the way is setting the dependencies addresses
		const factory = new ethers.ContractFactory(this.abi, this.bytecode, signer)
		const contract: BaseContract = await factory.deploy(signer.address, this.dependencies[0].address, this.dependencies[1].address)
		this.address = contract.target as string

	}
}
