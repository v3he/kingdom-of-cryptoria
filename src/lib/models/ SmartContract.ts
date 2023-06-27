import fs from 'fs'
import path from 'path'
import { BaseContract, JsonRpcSigner, ethers } from 'ethers'
import type { Sources } from '$lib/types/Source'

export class SmartContract {

	private _name: string
	private _fullname: string
	private _content: string
	private _abi: string
	private _bytecode: string
	private _address: string
	private _dependencies: SmartContract[]

	constructor(name: string, dependencies: SmartContract[] = []) {
		this._name = name
		this._fullname = `${name}.sol`
		this._dependencies = dependencies
		this._content = fs.readFileSync(path.join('src/lib/contracts', this._fullname), {
			encoding: 'utf8',
			flag: 'r'
		})
	}

	get address(): string {
		return this._address
	}

	set dependencies(dependencies: SmartContract | SmartContract[]) {
		this._dependencies = Array.isArray(dependencies) ? dependencies : [dependencies]
	}

	get dependencies(): SmartContract[] {
		return this._dependencies
	}

	get sources(): Sources {
		return this._dependencies.reduce((sources, dependency: SmartContract) => {
			sources[dependency._fullname] = { content: dependency._content }
			return sources
		}, { [this._fullname]: { content: this._content } })
	}

	// todo: refactor this code
	async deploy(compiledOutput: any, signer: JsonRpcSigner): Promise<void> {

		for (const dep of this._dependencies) {

			dep._abi = compiledOutput.contracts[dep._fullname][dep._name].abi
			dep._bytecode = compiledOutput.contracts[dep._fullname][dep._name].evm.bytecode.object

			const factory = new ethers.ContractFactory(dep._abi, dep._bytecode, signer)
			const contract: BaseContract = await factory.deploy()

			dep._address = contract.target as string

		}

		this._abi = compiledOutput.contracts[this._fullname][this._name].abi
		this._bytecode = compiledOutput.contracts[this._fullname][this._name].evm.bytecode.object

		const factory = new ethers.ContractFactory(this._abi, this._bytecode, signer)
		const contract: BaseContract = await factory.deploy(signer.address, ...this._dependencies.map((d) => d._address))

		this._address = contract.target as string

	}

}
