<script lang="ts">

	import { ethers } from 'ethers';
	// import type { PageData } from './$types'
	import { onMount } from 'svelte'

	// export let data: PageData

	let address: string = ''

	async function connectWallet() {
		if(window.ethereum) {

			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
				.catch((err: MetaMaskError) => {
					if (err.code === 4001) {
						console.log('Please connect to MetaMask.');
					} else {
						console.error(err);
					}
				})

			const provider = new ethers.BrowserProvider(window.ethereum)
			console.log(ethers.formatEther(await provider.getBalance(accounts[0])))

		}else{
			alert('No ethereum wallet found')
		}
	}

	onMount(async () => {
		if (window.ethereum) {

			console.log(window.ethereum.isMetaMask)

			const accounts = await window.ethereum.request({ method: 'eth_accounts' })

			window.ethereum.on('connect', () => console.log('connected'))
			window.ethereum.on('disconnect', () => console.log('disconnect'))

			// on change between connected accounts
			window.ethereum.on('accountsChanged', ()  => console.log('change'))

		} else {
			console.log('disconnected')
		}
	});

</script>

{#if address}
	<p>Successfully connected with account <strong>{address}</strong></p>
{:else}
	<button on:click={connectWallet}>Connect with Wallet</button>
{/if}

<!-- {#each data.accounts as account}
	<span>{account.pubKey}</span><br />
{/each} -->
