<script lang="ts">

	import Konva from 'konva'

	import { onMount } from 'svelte'

	let container: HTMLDivElement

	onMount(async () => {

		var stage = new Konva.Stage({
			container,
			width: container.clientWidth,
			height: container.clientHeight,
		})

		var layer = new Konva.Layer();

		var circle = new Konva.Circle({
			x: stage.width() / 2,
			y: stage.height() / 2,
			radius: 70,
			fill: 'red',
			stroke: 'black',
			strokeWidth: 4,
		});

		// add the shape to the layer
		layer.add(circle);

		// add the layer to the stage
		stage.add(layer);

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