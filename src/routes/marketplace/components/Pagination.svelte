<script lang="ts">
</script>

<div class="pagination">
  <button>&lt;</button>
  <span>1</span>
  <button>&gt;</button>
</div>

<style lang="scss">
  @font-face {
    font-family: 'SangSangRockRegular';
    src: url('$lib/assets/fonts/SangSangRockRegular.ttf') format('truetype');
  }
  .pagination {
    text-align: center;
    font-size: 1.5rem;
    font-family: 'SangSangRockRegular', sans-serif;
    span {
      color: #6e5a44;
    }
    button {
      all: unset;
      cursor: pointer;
      color: #33281f;
    }
  }
</style>
