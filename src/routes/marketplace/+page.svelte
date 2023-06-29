<script lang="ts">

	import { GameFactory } from '$lib/models/game/GameFactory'

	import { onMount } from 'svelte'

	let container: HTMLDivElement

	onMount(async () => {

		var game = GameFactory
			.container(container)
			.players('f3331ee142860fd9833305cc4ce070f3')
			.build()

		// var cont = stage.container();

		// cont.tabIndex = 1;

		// cont.focus();

		// cont.addEventListener('keyup', function (e) {
		// 	if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
		// 		player.idle()
		// 	} else {
		// 		return;
		// 	}
		// 	e.preventDefault();
		// });

		// cont.addEventListener('keydown', function (e) {
		// 	if (e.code === 'ArrowLeft') {
		// 		player.walk(e.code)
		// 	} else if (e.code === 'ArrowRight') {
		// 		player.walk(e.code)
		// 	} else {
		// 		return;
		// 	}
		// 	e.preventDefault();
		// })

	})

</script>

<div id="canvas" bind:this={container}></div>

<style lang="scss">
	#canvas {
		width: 100vw;
		height: 100vh;
		background: url("$lib/assets/images/background.png") no-repeat center center fixed;
		background-size: cover;
		-o-background-size: cover;
		-moz-background-size: cover;
		-webkit-background-size: cover;
	}	
</style>