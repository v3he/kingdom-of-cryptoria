<script lang="ts">
  import { Direction } from '$lib/types/Direction'
  import { wallet, currentPage, navigation } from '$lib/store'
  import { Navigation } from '$lib/types/Navigation'

  let pages: number[] = []

  $: pages = Array.from(
    {
      length: Math.ceil(
        $wallet?.nfts?.filter((nft) => ($navigation === Navigation.MY_NFTS ? nft.owned : true))
          .length / 6
      )
    },
    (_, index) => index + 1
  )

  const navigate = (direction: Direction) => {
    if (direction === Direction.LEFT && $currentPage > 1) {
      currentPage.update((v) => v - 1)
    } else if (direction === Direction.RIGHT && $currentPage < pages.length) {
      currentPage.update((v) => v + 1)
    }
  }
</script>

<div class="pagination">
  <button class="arrow" on:click={() => navigate(Direction.LEFT)}>&lt;</button>
  <div>
    {#each pages as page}
      <button
        class="page"
        class:active={$currentPage == page}
        on:click={() => currentPage.set(page)}>{page}</button>
    {/each}
  </div>
  <button class="arrow" on:click={() => navigate(Direction.RIGHT)}>&gt;</button>
</div>

<style lang="scss">
  .pagination {
    text-align: center;
    font-size: 1.5rem;
    font-family: 'SangSangRockRegular', sans-serif;
    display: grid;
    justify-content: center;
    grid-template-columns: 15px 80px 15px;

    .page,
    .arrow {
      all: unset;
      cursor: pointer;
    }

    .page {
      color: #6e5a44;

      &:not(:last-child) {
        margin-right: 15px;
      }

      &.active {
        color: #33281f;
      }
    }

    .arrow {
      color: #5d4c3a;
    }
  }
</style>
