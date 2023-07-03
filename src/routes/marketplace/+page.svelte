<script lang="ts">
  import { GameFactory } from '$lib/models/game/GameFactory'

  import { onMount } from 'svelte'

  let container: HTMLDivElement

  onMount(() => {
    //   if (!window.ethereum?.isMetaMask || !(await $wallet.isConnected())) {
    // 		return goto('/')
    // 	}

    // 	$wallet.startEventListeners()
    // 	$wallet.setProvider(new ethers.BrowserProvider(window.ethereum))

    // 	wallet.set($wallet)

    var game = GameFactory.container(container).players('d159ef156e3c30c243101b416e481167').build()
  })
</script>

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
