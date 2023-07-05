<script lang="ts">
  import heart from '$lib/assets/images/heart.png'
  import sword from '$lib/assets/images/sword.png'
  import shield from '$lib/assets/images/shield.png'
  import gif from '$lib/assets/nfts/dd71c131fa61239b580977d949a34717/idle.gif'
</script>

<div class="nft-viewer__container">
  <div class="nft__container">
    <span class="rarity mystic">Mystic</span>
    <img src={gif} alt="NFT Animation" />
    <div class="stats">
      <div class="stat__item"><img src={heart} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={sword} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={shield} alt="Health" /><span>100</span></div>
    </div>
  </div>
  <div class="nft__container">
    <span class="rarity mystic">Mystic</span>
    <img src={gif} alt="NFT Animation" />
    <div class="stats">
      <div class="stat__item"><img src={heart} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={sword} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={shield} alt="Health" /><span>100</span></div>
    </div>
  </div>
  <div class="nft__container">
    <span class="rarity mystic">Mystic</span>
    <img src={gif} alt="NFT Animation" />
    <div class="stats">
      <div class="stat__item"><img src={heart} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={sword} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={shield} alt="Health" /><span>100</span></div>
    </div>
  </div>
  <div class="nft__container">
    <span class="rarity mystic">Mystic</span>
    <img src={gif} alt="NFT Animation" />
    <div class="stats">
      <div class="stat__item"><img src={heart} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={sword} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={shield} alt="Health" /><span>100</span></div>
    </div>
  </div>
  <div class="nft__container">
    <span class="rarity mystic">Mystic</span>
    <img src={gif} alt="NFT Animation" />
    <div class="stats">
      <div class="stat__item"><img src={heart} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={sword} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={shield} alt="Health" /><span>100</span></div>
    </div>
  </div>
  <div class="nft__container">
    <span class="rarity mystic">Mystic</span>
    <img src={gif} alt="NFT Animation" />
    <div class="stats">
      <div class="stat__item"><img src={heart} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={sword} alt="Health" /><span>100</span></div>
      <div class="stat__item"><img src={shield} alt="Health" /><span>100</span></div>
    </div>
  </div>
</div>

<style lang="scss">
  .nft-viewer__container {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;

    .nft__container {
      margin: 15px;
      height: 150px;
      border: 1px solid#5e4d3a;
      border-radius: 3px;
      position: relative;
      display: grid;
      grid-template-columns: auto auto;
      cursor: pointer;

      .rarity {
        top: -5px;
        left: -10px;
        padding: 2px 8px;
        color: #fff;
        border-radius: 5px;
        position: absolute;

        &.mystic {
          background-color: #8a0bd2;
        }

        &.celestial {
          background-color: #ffd100;
        }

        &.arcane {
          background-color: #08a045;
        }

        &.ethereal {
          background-color: #00b4d8;
        }
      }

      img {
        width: 150px;
        // transform-origin: center center;
        // transform: scale(1.1);
      }

      .stats {
        padding: 20px 10px 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .stat__item {
          display: grid;
          grid-template-columns: 25px auto;
          align-items: center;
          img {
            width: 18px;
          }
        }
      }
    }
  }
</style>
