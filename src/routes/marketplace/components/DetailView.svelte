<script lang="ts">
  import { selected } from '$lib/store'
  import { AttributeType } from '$lib/types/Metadata'

  const findTraitValue = (trait: AttributeType) => $selected?.metadata.attributes?.find((a) => a.trait_type === trait)?.value

  $: health = findTraitValue(AttributeType.HEALTH)
  $: attack = findTraitValue(AttributeType.ATTACK)
  $: defense = findTraitValue(AttributeType.DEFENSE)

  const onBuy = () => console.log('buy nft')
  const onSell = () => console.log('sell nft')
  const onCancelSale = () => console.log('cancel sale')

  const buttons = [
    { class: 'buy-nft', click: onBuy },
    { class: 'sell-nft', click: onSell },
    { class: 'cancel-sale-nft', click: onCancelSale }
  ]
</script>

<div class="nft-detail-view__container">
  <div class="navigation__container">
    <button on:click={() => selected.set(null)}>&lt; Marketplace</button>
  </div>
  <div class="main__container">
    <div class="nft__container">
      <img src={`/images/nfts/${$selected?.metadata.trace}/idle.gif`} alt="NFT Animation" />
      <div class="stats">
        <div class="stat__item"><img src="/images/heart.png" alt="Health" /><span>{health}</span></div>
        <div class="stat__item"><img src="/images/sword32.png" alt="Attack" /><span>{attack}</span></div>
        <div class="stat__item"><img src="/images/shield32.png" alt="Defense" /><span>{defense}</span></div>
      </div>
    </div>
    <div class="info__container">
      <div class="info__item rm-mg-top"><p><strong>Name:</strong> {$selected?.metadata.name}</p></div>
      <div class="info__item"><p><strong>Description:</strong> {$selected?.metadata.description}</p></div>
      <div class="info__item actions">
        {#each buttons as button}
          <button class={button.class} on:click={button.click} />
        {/each}
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
        position: relative;
        img {
          width: 400px;
        }
        .stats {
          width: 100%;
          bottom: 5px;
          position: absolute;
          display: flex;
          padding: 0 60px;
          justify-content: space-between;
          .stat__item {
            display: grid;
            grid-template-columns: 35px auto;
            align-items: center;
            img {
              width: 24px;
            }
            span {
              font-size: 1.4rem;
            }
          }
        }
      }
      .info__container {
        .info__item {
          font-size: 1.4rem;
          strong {
            color: #33281f;
          }
          &.rm-mg-top {
            p {
              margin-top: 0;
            }
          }
          &.actions {
            button {
              all: unset;
              width: 190px;
              height: 60px;
              cursor: pointer;
              background-size: contain;
              background-repeat: no-repeat;
              background-color: transparent;
            }
            .buy-nft {
              background-image: url('/assets/buttons/buy-button.png');
              &:hover {
                background-image: url('/assets/buttons/buy-button-pressed.png');
              }
            }
            .sell-nft {
              background-image: url('/assets/buttons/sell-button.png');
              &:hover {
                background-image: url('/assets/buttons/sell-button-pressed.png');
              }
            }
            .cancel-sale-nft {
              background-image: url('/assets/buttons/cancel-sale-button.png');
              &:hover {
                background-image: url('/assets/buttons/cancel-sale-button-pressed.png');
              }
            }
          }
        }
      }
    }
  }
</style>
