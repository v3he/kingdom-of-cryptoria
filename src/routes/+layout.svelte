<script>

  import { onMount } from 'svelte'

  let smallScreen = false

  onMount(() => {

    const checkScreenSize = () => {
      smallScreen = window.innerWidth < 1280 || window.innerHeight < 580
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }

  })
</script>

{#if smallScreen}
  <div>Your screen is too small to view this content. Please resize your window.</div>
{:else}
  <slot></slot>
{/if}