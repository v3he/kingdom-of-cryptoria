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
    $wallet.setNFTContract(data.nft.address, data.nft.abi)

    wallet.set($wallet)

    const nfts = await $wallet.getOwnedNFTs()

    var game = GameFactory.container(container).players('f42a198ed17c4bbb4270db0ab79927cc').build()
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
