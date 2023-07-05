<script lang="ts">
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  import { wallet } from '$lib/store'
  import { goto } from '$app/navigation'
  import { GameFactory } from '$lib/models/game/GameFactory'
  import Marketplace from './components/Marketplace.svelte'

  import type { PageData } from './$types'

  export let data: PageData

  let container: HTMLDivElement

  onMount(async () => {
    if (!window.ethereum?.isMetaMask || !(await $wallet.isConnected())) {
      return goto('/')
    }

    $wallet.setProvider(new ethers.BrowserProvider(window.ethereum))
    await $wallet.setNFTContract(data.nft.address, data.nft.abi)

    wallet.set($wallet)

    GameFactory.container(container)
      .players($wallet?.nfts?.owned.map((n) => n.trace))
      .build()
  })
</script>

<Marketplace />
<div id="canvas" bind:this={container} />

<style lang="scss">
  #canvas {
    width: 100vw;
    height: 100vh;
    background: url('$lib/assets/images/background.png') no-repeat center center fixed;
    background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
  }
</style>
