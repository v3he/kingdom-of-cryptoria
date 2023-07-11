import Database from 'better-sqlite3'

const db = new Database('./ganache/marketplace.db', { verbose: console.log })

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

export default db
