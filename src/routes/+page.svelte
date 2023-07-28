<!-- <script lang="ts">
  import { onMount } from 'svelte'
  import { wallet } from '$lib/store'
  import { goto } from '$app/navigation'

  import type { PageData } from './$types'

  export let data: PageData

  let isMetaMask = false
  let isConnected = false

  async function connectMetaMask() {
    const accounts = await window?.ethereum
      ?.request({ method: 'eth_requestAccounts' })
      .catch((err: MetaMaskError) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.')
        } else {
          console.error(err)
        }
      })

    if (!accounts) {
      return
    }

    await $wallet.promptChainCreation()
    await $wallet.promptTokenCreation(data.token)

    return goto('/marketplace')
  }

  onMount(async () => {
    isMetaMask = !!window.ethereum?.isMetaMask

    if (!isMetaMask) {
      return
    }

    if (await $wallet.isConnected()) {
      return goto('/marketplace')
    }
  })
</script> -->

<!-- {#if isMetaMask}
  {#if !isConnected}
    <button on:click={connectMetaMask}>Connect with MetaMask</button>
    <br />
    <br />
    <h2>You can use this accounts to play with</h2>
    {#each data.accounts as account}
			<span>{account.privKey}</span><br />
		{/each}
  {/if}
{:else}
  <p>You need to install metamask in order to play</p>
{/if} -->

<script lang="ts">

  import { onMount } from "svelte"
  import { GameFactory } from "$lib/models/game/GameFactory"
  import { Mocks } from "$lib/mocks/Mocks"

  let container: HTMLDivElement

  onMount(() => {
    GameFactory.container(container)
      .players(Mocks.pickRandomNFTs(2))
      .build()
  })

</script>

<div class="overlay">
  <div class="scroll__container">
    <div class="scroll__body">
      hi
    </div>
  </div>
</div>
<div id="canvas" bind:this={container} />

<style lang="scss">

  .overlay {
    z-index: 2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    .scroll__container {
      width: 755px;
      height: 550px;
      padding: 190px 90px 140px 90px;
      background: url('/assets/scrolls/wide.png') no-repeat center center;
      background-size: contain;
      -o-background-size: contain;
      -moz-background-size: contain;
      -webkit-background-size: contain;
    }
  }

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































