import type { NFT } from '$lib/server/db/types/NFT'

export class Mocks {
  private static NFTs: string[] = [
    '2344924e500b22be9e0a8886a3c1aabb',
    '6e60985032ba3813fde92546bc31876e',
    'ab0b6ef7df5a0c8d3c452643fc3c52f6',
    'ebf8daae3434a3555487d34c0547317d',
    '459ce32f777eb80afeaac93b0d9b2703',
    '73dcc3311f53f9938c0b483cf6f3bd04',
    'bd57e9e8beb89afbf045fcc238b52aca',
    'f3331ee142860fd9833305cc4ce070f3',
    '58613e0607523605e4579e19176f701e',
    '761bd567a04b437a8da0a4dcb04a8219',
    'd159ef156e3c30c243101b416e481167',
    'f42a198ed17c4bbb4270db0ab79927cc',
    '627cc76b080dd4e5f726e1c7e28e58d0',
    'a03aa024dfbd375d8f0d2ecc2bb46161',
    'dd71c131fa61239b580977d949a34717'
  ]

  public static pickRandomNFTs(qty: number): NFT[] {
    let result = new Array(qty),
      len = this.NFTs.length,
      taken = new Array(len)

    while (qty--) {
      let x = Math.floor(Math.random() * len)
      result[qty] = this.NFTs[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }

    return result.map((n) => {
      return {
        id: 1,
        owner: '0x123456789',
        ipfs: 'Qm123456789',
        metadata: {
          name: 'NFT Name',
          description: 'NFT Description',
          image: 'image.jpg',
          trace: n,
          attributes: [],
          owner: '0x123456789',
          owned: false
        }
      }
    })
  }
}
