import fs from 'fs'
import solc from 'solc'
import path from 'path'
import ganache from 'ganache'

import { Account } from './Account'
import { Marketplace } from './Marketplace'
import { JsonRpcProvider, JsonRpcSigner, ethers } from 'ethers'
import { WSServer } from './websockets/WSServer'

const PORT = 8545
const DB_PATH = './ganache'
const ACCOUNT_KEYS_PATH = `${DB_PATH}/accounts.json`

const defaultOptions = {
  logging: {
    quiet: true
  },
  database: {
    dbPath: DB_PATH
  },
  chain: {
    chainId: 5555
  },
  wallet: {
    totalAccounts: 5,
    deterministic: true,
    defaultBalance: 100,
    accountKeysPath: ACCOUNT_KEYS_PATH
  }
}

export class GanacheServer {
  provider: JsonRpcProvider
  signer: JsonRpcSigner
  accounts: Account[]
  marketplace: Marketplace

  private static instance: GanacheServer | null = null

  constructor(provider: JsonRpcProvider, signer: JsonRpcSigner, accounts: Account[]) {
    this.provider = provider
    this.signer = signer
    this.accounts = accounts
    this.deploy()
  }

  static async start(): Promise<GanacheServer | null> {
    if (!GanacheServer.instance) {
      try {

        await new Promise((resolve, reject) => {
          const server = ganache.server(defaultOptions)
          server.listen(PORT, (err) => (err ? reject() : resolve(server.provider)))
        })

        const provider = new ethers.JsonRpcProvider(`http://localhost:${PORT}`)
        const accountsRaw = JSON.parse(fs.readFileSync(ACCOUNT_KEYS_PATH, { encoding: 'utf8' }))

        const accounts = Object.entries(accountsRaw.private_keys)
          .slice(1)
          .map(([pub, priv]) => new Account(pub, priv as string))
        
        GanacheServer.instance = new GanacheServer(provider, await provider.getSigner(0), accounts)

      } catch (error) {
        return null
      }
    }
    return GanacheServer.instance
  }

  private async deploy(): Promise<void> {

    this.marketplace = new Marketplace(this.signer)

    const compileOptions = {
      language: 'Solidity',
      sources: this.marketplace.sources,
      settings: {
        outputSelection: { '*': { '*': ['*'] } }
      }
    }

    const compiledOutput = JSON.parse(
      solc.compile(JSON.stringify(compileOptions), {
        import: (d: string) => ({
          contents: fs.readFileSync(path.join('node_modules', d), { encoding: 'utf8' })
        })
      })
    )

    // handle this
    if (compiledOutput?.errors?.find((e) => e.severity === 'error')) {
      throw 'error while compiling smart contracts'
    }

    WSServer.getInstance()?.sendSetupNotification({
      message: 'compilation done',
      current_step: 1,
      total_steps: 4
    })

    await this.marketplace.deploy(compiledOutput)

    WSServer.getInstance()?.sendSetupNotification({
      message: 'deploy done',
      current_step: 2,
      total_steps: 4
    })

    await this.marketplace.mintNFTs([
      // 'bafkreih5i55wwrprdsjwfgkv3e2cie22j5lqmanuuoxzogs4yfitdjnwyy',
      // 'bafkreift35nigg32refqiy2whclkn5nlg3ljefjt5ps4mnjlosiukry7ou',
      'bafkreifwznslzg4kmbz67czftvx6eyvu5uf5aq3fplhgshfnvo6civrz4e'
      // 'bafkreib5hnrfnfko5zyc57zp7j6meno4yrw3xb6c7t4p2heujsuxj5xzoa',
      // 'bafkreibngg4tdgmxqaz6akqlz3jezp5wjfmvgrt5rwr6a6ay6stufnhrbq',
      // 'bafkreicax3m6lx7fxtajjyyh4qcxqohdzihjqcds2m4wccw4yp752eqffq',
      // 'bafkreief6hpicjfiz5sweqqsyiqclhnfkscqba5jboa7xxpmmdcy3mj3fm',
      // new NFT('bafkreihah4rpwmhdlwehyxwdirobmdbtmfm3em2nxyvkais77nijfpecmq'),
      // new NFT('bafkreie33u54p273je7z27de4hicvjecfaivz6dewkxqyqub52eonedpjy'),
      // new NFT('bafkreifinm6ci4kkzn4kqljies3btkb4uj7ustyktx3tggwaktfenswd3y'),
      // new NFT('bafkreif273jgam2ie25zs2yovfpqfxvinnvcykfko4cdbvpvp36pmrrane'),
      // new NFT('bafkreiemroxagpejflzmi6zne25xhkzexogai46czscvbncbc5mczhumf4'),
      // new NFT('bafkreigsqz3s3cqr63e6jq65iwduzcinjgiveizch3kjzdciz37x6ln3zq'),
      // new NFT('bafkreictbli4ryxdxnfdejv5pzqxdpogermtel6ixboewsrnzdfhdije44'),
      // new NFT('bafkreie3d5dhdyop6n6nm6xmmd2fem37jenkhnly5zxofrdhoikfrpmzma')
    ])

    WSServer.getInstance()?.sendSetupNotification({
      message: 'mint done',
      current_step: 3,
      total_steps: 4
    })

    await this.marketplace.mintNFTs(
      [
        'bafkreie3d5dhdyop6n6nm6xmmd2fem37jenkhnly5zxofrdhoikfrpmzma'
        // new NFT('bafkreib5hnrfnfko5zyc57zp7j6meno4yrw3xb6c7t4p2heujsuxj5xzoa'),
        // new NFT('bafkreifinm6ci4kkzn4kqljies3btkb4uj7ustyktx3tggwaktfenswd3y'),
        // new NFT('bafkreif273jgam2ie25zs2yovfpqfxvinnvcykfko4cdbvpvp36pmrrane'),
        // new NFT('bafkreih5i55wwrprdsjwfgkv3e2cie22j5lqmanuuoxzogs4yfitdjnwyy'),
        // new NFT('bafkreigsqz3s3cqr63e6jq65iwduzcinjgiveizch3kjzdciz37x6ln3zq'),
        // new NFT('bafkreief6hpicjfiz5sweqqsyiqclhnfkscqba5jboa7xxpmmdcy3mj3fm')
      ],
      '0xffcf8fdee72ac11b5c542428b35eef5769c409f0'
    )

    await this.marketplace.mintEtherStones(
      100,
      this.accounts.map((acc: Account) => acc.pubKey)
    )
  }
}
