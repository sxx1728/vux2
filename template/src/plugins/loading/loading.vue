<template>
  <div class="loading" v-show="show">
    <div class="loader">
      <img src="./loading.gif">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>
<style lang="less" scope>
  .loading{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .loader{
      position: absolute;
      background: black;
      opacity: 0.7;
      border-radius: 5px;
      top: 40%;
      left: 2.6rem;
      width: 1.2rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 1.0rem;
        height: 1.0rem;
      }
    }
  }
</style>