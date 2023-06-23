<script lang="ts">

	import { ethers } from 'ethers'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { wallet } from '$lib/stores/GeneralStore'

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
