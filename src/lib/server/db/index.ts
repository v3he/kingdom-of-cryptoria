import Database from 'better-sqlite3'

const db = new Database('./ganache/marketplace.db', { verbose: console.log })

db.exec('DELETE FROM nfts').exec('DELETE FROM sell_orders').exec('DELETE FROM buy_orders')

db.exec(`
  CREATE TABLE IF NOT EXISTS nfts (
    owner TEXT,
    nftId INTEGER
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS sell_orders (
    owner TEXT,
    nftId INTEGER,
    erc20Amount INTEGER
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS buy_orders (
    owner TEXT,
    orderId INTEGER,
    nftId INTEGER,
    erc20Amount INTEGER
  )
`)

export function createNFT(owner: string, nftId: number) {
  db.prepare('INSERT INTO nfts (owner, nftId) VALUES (?, ?)').run(owner, nftId)
}
