<script lang="ts">
  import { navigation } from '$lib/store'
  import { Navigation } from '$lib/types/Navigation'
</script>

<ul>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <li class:active={$navigation === Navigation.COLLECTION}>
    <a href="#" on:click={() => navigation.update((n) => Navigation.COLLECTION)}>COLLECTION</a>
  </li>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <li class:active={$navigation === Navigation.BUY_ORDERS}>
    <a href="#" on:click={() => navigation.update((n) => Navigation.BUY_ORDERS)}>BUY ORDERS</a>
  </li>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <li class:active={$navigation === Navigation.MY_NFTS}>
    <a href="#" on:click={() => navigation.update((n) => Navigation.MY_NFTS)}>MY NFT's</a>
  </li>
</ul>

<style lang="scss">
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 10px auto;
    margin-bottom: 30px;
    width: fit-content;

    li {
      display: inline;
      position: relative;

      &:not(:last-child) {
        margin-right: 100px;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 3px;
        background-color: #000;
        visibility: hidden;
      }

      &.active::after {
        visibility: visible;
      }

      a {
        color: #000;
        font-size: 1.7rem;
        text-decoration: none;
      }
    }
  }
</style>
