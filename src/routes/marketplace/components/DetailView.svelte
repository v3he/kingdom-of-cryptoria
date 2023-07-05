<script lang="ts">

  import { selected } from "$lib/store"

</script>

<div class="nft-detail-view__container">
  <div class="navigation__container">
    <button on:click={() => selected.set(null)}>&lt; Marketplace</button>
  </div>
  <div class="main__container">
    <div class="nft__container">
      <img src="/images/nfts/{$selected?.trace}/idle.gif" alt="NFT Animation" />
    </div>
    <div class="info__container">
      <div class="info__item">
        <div class="stats">
          <div class="stat__item">
            <img src="/images/heart.png" alt="Health" /><span>100</span>
          </div>
          <div class="stat__item">
            <img src="/images/sword32.png" alt="Attack" /><span>100</span>
          </div>
          <div class="stat__item">
            <img src="/images/shield32.png" alt="Defense" /><span>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .nft-detail-view__container {
    height: 100%;
    .navigation__container {
      button {
        all: unset;
        margin-top: 20px;
        cursor: pointer;
        font-size: 1.8rem;
      }
    }
    .main__container {
      display: grid;
      grid-template-columns: 400px auto;
      .nft__container {
        img {
          width: 400px;
        }
      }
      .info__container {
        .info__item {
          .stats {
            display: flex;
            margin: 0 20px;
            justify-content: space-between;
            .stat__item {
              display: grid;
              grid-template-columns: 40px auto;
              align-items: center;
              img {
                width: 30px;
              }
              span {
                font-size: 1.6rem;
              }
            }
          }
        }  
      }
    }
  }
</style>
