<script lang="ts">

	import { ethers } from 'ethers'
	import { onMount } from 'svelte'
	import { wallet } from '$lib/store'
	import { goto } from '$app/navigation'

	onMount(async () => {

		if (!window.ethereum?.isMetaMask || !await $wallet.isConnected()) {
			return goto('/')
		}

		$wallet.startEventListeners()
		$wallet.setProvider(new ethers.BrowserProvider(window.ethereum))

		wallet.set($wallet)

	})

</script>

<h1>Marketplace</h1>
<h3>Connected with {$wallet.account}</h3>
