import fs from 'fs'
import path from 'path'

export class SmartContract {

	name: string
	fullname: string
	location: string
	content: string
  abi: string
  bytecode: string
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

  parse(output: any): void {
    this.dependencies.forEach((dep: SmartContract) => {
      dep.abi = output.contracts[dep.fullname][dep.name].abi
      dep.bytecode = output.contracts[dep.fullname][dep.name].evm.bytecode.object
    })
    this.abi = output.contracts[this.fullname][this.name].abi
    this.bytecode = output.contracts[this.fullname][this.name].evm.bytecode.object
  }

}
