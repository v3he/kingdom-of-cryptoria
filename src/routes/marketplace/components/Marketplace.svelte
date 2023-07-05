<script lang="ts">
  import close from '$lib/assets/images/close-button.png'
  import Pagination from './Pagination.svelte'
  import Viewer from './Viewer.svelte'

  let isOpen: boolean = true
  let isMarketplace: boolean = false
</script>

<div class="marketplace__container">
  {#if isOpen}
    <div class="stone-background__container">
      <button class="close-button" on:click={() => (isOpen = false)}>
        <img src={close} alt="Close Button" />
      </button>
      <div class="parchment-background__container">
        <ul>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <li class:active={isMarketplace}>
            <a href="#" on:click={() => (isMarketplace = true)}>COLLECTION</a>
          </li>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <li class:active={isMarketplace}>
            <a href="#" on:click={() => (isMarketplace = true)}>BUY ORDERS</a>
          </li>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <li class:active={!isMarketplace}>
            <a href="#" on:click={() => (isMarketplace = false)}>MY NFT's</a>
          </li>
        </ul>
        <Viewer />
        <Pagination />
      </div>
    </div>
  {/if}
  <button class="open-marketplace" on:click={() => (isOpen = true)} />
</div>

<style lang="scss">
  @font-face {
    font-family: 'SangSangRockRegular';
    src: url('$lib/assets/fonts/SangSangRockRegular.ttf') format('truetype');
  }

  .marketplace__container {
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    .open-marketplace {
      padding: 0;
      right: 40px;
      bottom: 40px;
      position: absolute;
      border: none;
      width: 200px;
      height: 70px;
      cursor: pointer;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: transparent;
      background-image: url('$lib/assets/images/open-market.png');
      &:hover {
        background-image: url('$lib/assets/images/open-market-pressed.png');
      }
    }

    .stone-background__container {
      width: 923px;
      height: 619px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('$lib/assets/images/board-stone.png') no-repeat center/contain;
      background-size: contain;
      -o-background-size: contain;
      -moz-background-size: contain;
      -webkit-background-size: contain;

      .close-button {
        all: unset;
        width: 60px;
        height: 60px;
        top: 40px;
        right: -50px;
        position: absolute;
        cursor: pointer;
        img {
          width: 100%;
        }
      }

      .parchment-background__container {
        width: 885px;
        height: 570px;
        padding: 50px;
        font-family: 'SangSangRockRegular', sans-serif;
        background: url('$lib/assets/images/board-parchment.png') no-repeat center/contain;
        background-size: contain;
        -o-background-size: contain;
        -moz-background-size: contain;
        -webkit-background-size: contain;

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
      }
    }
  }
</style>
