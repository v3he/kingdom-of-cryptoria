<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

{#each data.accounts as account}
	<span>{account.pubKey}</span><br />
{/each}
