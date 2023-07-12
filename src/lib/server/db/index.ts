import Database from 'better-sqlite3'

const db = new Database('./ganache/marketplace.db', { verbose: console.log })

db.exec('DROP TABLE IF EXISTS nfts')
db.exec('DROP TABLE IF EXISTS buy_orders')
db.exec('DROP TABLE IF EXISTS sell_orders')

db.exec(`
  CREATE TABLE IF NOT EXISTS nfts (
    owner TEXT,
    nft_id  INTEGER,
    ipfs TEXT,
    on_sale INTEGER
  )
`)

interface BuyOrder {
  id: number
  owner: string
  nftID: number
  amount: number
  status: string
}

db.exec(`
  CREATE TABLE IF NOT EXISTS buy_orders (
    id INTEGER,
    owner TEXT,
    nft_id INTEGER,
    amount INTEGER,
    status TEXT
  )
`)

interface SellOrder {
  owner: string
  nftID: number
  amount: number
}

db.exec(`
  CREATE TABLE IF NOT EXISTS sell_orders (
    owner TEXT,
    nft_id INTEGER,
    amount INTEGER
  )
`)

export function createNFT(owner: string, nftId: number, ipfs: string, sale: boolean = false) {
  db.prepare('INSERT INTO nfts VALUES (?, ?, ?, ?)').run(owner, nftId, ipfs, Number(sale))
}

export function createSellOrder(order: SellOrder) {
  db.prepare('INSERT INTO sell_orders VALUES (?, ?, ?)').run(
    order.owner,
    order.nftID,
    order.amount
  )
  updateOnSaleStatus(order.nftID, true)
}

export function updateOnSaleStatus(nftId: number, sale: boolean) {
  db.prepare('UPDATE nfts SET on_sale = ? WHERE nft_id = ?').run(Number(sale), nftId)
}

export function createBuyOrder(order: BuyOrder) {
  db.prepare('INSERT INTO buy_orders VALUES (?, ?, ?, ?, ?)').run(
    order.id,
    order.owner,
    order.nftID,
    order.amount,
    order.status
  )
}

export function getBuyOrdersByCreator(owner: string): BuyOrder[] {
  return db
    .prepare('SELECT * FROM buy_orders WHERE creator_address = ?')
    .all(owner)
    ?.map((row: any) => ({
      id: row.order_id,
      owner: row.owner,
      nftID: row.nft_id,
      amount: row.amount,
      status: row.status
    }))
}
