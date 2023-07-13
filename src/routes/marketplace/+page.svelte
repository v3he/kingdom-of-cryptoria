<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import { ethers } from 'ethers'
  import { wallet } from '$lib/store'
  import { goto } from '$app/navigation'
  import { GameFactory } from '$lib/models/game/GameFactory'
  import Marketplace from './components/Marketplace.svelte'

  import type { PageData } from './$types'
  import type { NFT } from '$lib/server/db/types/NFT'

  export let data: PageData

  let container: HTMLDivElement

  setContext('collection', data.nft.collection)

  onMount(async () => {
    if (!window.ethereum?.isMetaMask || !(await $wallet.isConnected())) {
      return goto('/')
    }

    $wallet.setProvider(new ethers.BrowserProvider(window.ethereum))

    wallet.set($wallet)

    GameFactory.container(container)
      .players(
        data.nft.collection.filter((nft: NFT) => nft.owner.toLowerCase() === $wallet.account)
      )
      .build()
  })
</script>

<Marketplace />
<div id="canvas" bind:this={container} />

<style lang="scss">
  #canvas {
    width: 100vw;
    height: 100vh;
    background: url('/images/background.png') no-repeat center center fixed;
    background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
  }
</style>
