<script lang="ts">
  import { view } from "$lib/store"
  import { View } from "$lib/types/View"

  const sellNFT = () => {
    console.log('sell nft')
  }

</script>

<div class="sell__container">
  <div class="title__container">
    <h2>Are you sure you want to sell this NFT?</h2>
    <p>Please set the selling price:</p>
  </div>
  <div class="form__container">
    <input type="number" id="amount" name="amount" placeholder="10" required>
    <label for="amount"><strong>EST</strong></label>
  </div>
  <div class="action__buttons">
    <button class="accept" on:click={sellNFT}></button>
    <button class="cancel" on:click={() => view.set(View.INFO)}></button>
  </div>
</div>

<style lang="scss">
  .sell__container {
    font-size: 1.4rem;
    .title__container {
      h2 {
        margin-top: 0;
      }
    }
    .form__container {
      strong {
        color: #33281f;
      }
      input {
        all: unset;
        width: 290px;
        padding: 10px;
        border: 2px solid #33281f;
        border-radius: 5px;
        background: none;
      } 
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    .action__buttons {
      display: flex;
      margin-top: 2rem;
      button {
        all: unset;
        width: 190px;
        height: 60px;
        cursor: pointer;
        background-size: contain;
        background-repeat: no-repeat;
        background-color: transparent;
      }
      .accept {
        background-image: url('/assets/buttons/accept-button.png');
        &:hover {
          background-image: url('/assets/buttons/accept-button-pressed.png');
        }
      }
      .cancel {
        background-image: url('/assets/buttons/cancel-button.png');
        &:hover {
          background-image: url('/assets/buttons/cancel-button-pressed.png');
        }
      }
    }
  }
</style>
