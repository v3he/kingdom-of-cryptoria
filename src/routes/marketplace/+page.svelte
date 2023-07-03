<script lang="ts">
	import { GameFactory } from '$lib/models/game/GameFactory'

	import { onMount } from 'svelte'

	let container: HTMLDivElement

	onMount(() => {

		var game = GameFactory
			.container(container)
			.players('f3331ee142860fd9833305cc4ce070f3')
			.build()

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
