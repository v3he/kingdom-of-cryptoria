<script lang="ts">
  let isMarketplace = false
</script>

<div class="marketplace__container">
  <div class="stone-background__container">
    <div class="parchment-background__container">
      <ul>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <li class:active={isMarketplace}><a href="#" on:click={() => isMarketplace = true}>MARKETPLACE</a></li>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <li class:active={!isMarketplace}><a href="#" on:click={() => isMarketplace = false}>MY NFT's</a></li>
      </ul>
    </div>
  </div>
</div>

<style lang="scss">

  @font-face {
    font-family: 'BMYEONSUNG';
    src: url('$lib/assets/fonts/BMYEONSUNG.ttf') format('truetype');
  }

  .marketplace__container {

    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    .stone-background__container {

      width: 923px;
      height: 619px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('$lib/assets/images/board-stone.png') no-repeat center/contain;
      background-size: contain;
      -o-background-size: contain;
      -moz-background-size: contain;
      -webkit-background-size: contain;

      .parchment-background__container {
        width: 885px;
        height: 570px;
        padding: 50px;
        font-family: 'BMYEONSUNG', sans-serif;
        background: url('$lib/assets/images/board-parchment.png') no-repeat center/contain;
        background-size: contain;
        -o-background-size: contain;
        -moz-background-size: contain;
        -webkit-background-size: contain;

        ul {
          list-style-type: none;
          padding-left: 0;
          margin: 15px auto;
          width: fit-content;

          li {

            display: inline;
            position: relative;

            &:not(:last-child) {
              margin-right: 100px;
            }

            &::after {
              content: "";
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
              font-weight: bold;
              text-decoration: none;
            }

          }
        }
      }
 
    }
 }
</style>
