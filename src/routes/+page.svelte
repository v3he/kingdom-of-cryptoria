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

  import { onMount } from 'svelte'
  import { ws } from '$lib/store'
  import { Mocks } from '$lib/mocks/Mocks'
  import { Channel } from '$lib/types/Channel'
  import { GameFactory } from '$lib/models/game/GameFactory'

  import ProgressBar from '$lib/components/ProgressBar.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  let isLoading = true
  let container: HTMLDivElement

  if(!data.error) {
    $ws.socket.on(Channel.SETUP, (msg) => {
      console.log('new notification ::', msg)
    })
  }

  function connectWithMetaMask() {
    console.log('connect')
  }

  onMount(() => {
    GameFactory.container(container).players(Mocks.pickRandomNFTs(2)).build()
  })
</script>

<div class="overlay">
  <div class="logo__container">
    <img src="/assets/koc.png" alt="Kingdom Of Cryptoria Logo" />
  </div>
  <div class="scroll__container">
    <div class="scroll__body">
      {#if data.error}
        <h2>Oops! there seems to have been an error</h2>
        <div class="error__container">
          <img src="/images/exclamation-red.png" alt="">
          <p><strong>{data.error}</strong><br/>Please try rebooting the server</p>
        </div>
      {:else}
        <h2>Welcome to the <strong>Kingdom of Cryptoria</strong>!</h2>
        {#if isLoading}
          <p style="margin-bottom: 2rem;">Please wait while all components are initialized</p>
          <ProgressBar />
        {:else}
          <p>
            If you're new here and unsure about how to play, we've got you covered. Please visit the
            ==&gt; <a href="/how-to-play"><strong>How To Play</strong></a> &lt;== section where you'll
            find all the information you need to get started. Once you're comfortable and ready to dive
            in, simply click on the button below. Happy Hacking!
          </p>
          <button class="connect-with-metamask" on:click={connectWithMetaMask} />
        {/if}
      {/if}
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
    .logo__container {
      left: 0;
      top: 30px;
      position: absolute;
      img {
        width: 250px;
      }
    }
    .scroll__container {
      width: 755px;
      height: 550px;
      padding: 170px 90px 140px 90px;
      background: url('/assets/scrolls/wide.png') no-repeat center center;
      background-size: contain;
      -o-background-size: contain;
      -moz-background-size: contain;
      -webkit-background-size: contain;
      .scroll__body {
        text-align: center;
        font-family: 'BMYEONSUNG', sans-serif;
        .error__container {
          img {
            width: 60px;
          }
          strong {
            font-size: 1.8rem;
            color: #c3542a;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
          }
        }
        h2 {
          strong {
            font-size: 1.8rem;
            color: #e5a83d;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
          }
        }
        p {
          font-size: 1.1rem;
          line-height: 1.3;
          font-family: 'SangSangRockRegular', sans-serif;
          a {
            text-decoration: none;
            strong {
              font-size: 1.2rem;
              color: #e5a83d;
              text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
            }
          }
        }
        .connect-with-metamask {
          all: unset;
          width: 300px;
          height: 60px;
          cursor: pointer;
          background-size: contain;
          background-repeat: no-repeat;
          background-color: transparent;
          background-image: url('/assets/buttons/connect-with-metamask-button.png');
          &:hover {
            background-image: url('/assets/buttons/connect-with-metamask-button-pressed.png');
          }
        }
      }
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
