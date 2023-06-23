<script lang="ts">

	import { ethers } from 'ethers';
	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	import { goto } from "$app/navigation"
	import { Wallet } from '$lib/Wallet'

	export let data: PageData

	let wallet: Wallet

	let isMetaMask: boolean = false
	let isConnected: boolean = false

	async function connectMetaMask() {
		if(window.ethereum) {

			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
				.catch((err: MetaMaskError) => {
					if (err.code === 4001) {
						console.log('Please connect to MetaMask.');
					} else {
						console.error(err);
					}
				})

			setTimeout(() => {
				console.log('call')
				wallet.setLocalChain()
			}, 4000)

			const provider = new ethers.BrowserProvider(window.ethereum)
			console.log(ethers.formatEther(await provider.getBalance(accounts[0])))

		}else{
			alert('No ethereum wallet found')
		}
	}

	onMount(async () => {

		isMetaMask = !!window.ethereum?.isMetaMask

		if(!isMetaMask)
			return

		// check if the wallet is already created
		wallet = new Wallet(await window.ethereum.request({ method: 'eth_accounts' }))

	})

</script>

{#if isMetaMask}
	{#if wallet?.isConnected()}
		<p>Successfully connected with {wallet.account}</p>
	{:else}
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
{/if}
