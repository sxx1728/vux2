<template>
  <div class="content">
          
    <div class="tabbar">
      <tabbar v-model="tabIndex">
        <tabbar-item :selected="tabIndex===0">
          <img slot="icon" v-show="tabIndex===0" src="../assets/index_sel.png">
          <img slot="icon" v-show="tabIndex!==0" src="../assets/index.png">
          <span slot="label">商城主页</span>
        </tabbar-item>
        <tabbar-item @on-item-click="refreshOrders">
          <img slot="icon" v-show="tabIndex===1" src="../assets/orders_sel.png">
          <img slot="icon" v-show="tabIndex!=1" src="../assets/orders.png">
          <span slot="label">我的订单</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, XButton} from 'vux'

export default {
  name: 'index',
  components: {
    Tabbar,
    TabbarItem,
    XButton,
  },

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      tabIndex: 0
    }
  },

  created () {
  },

  methods: {
    refreshOrders () {
      this.$refs.orders.loadOrders()
      // for debug
      // store.save("token", '')
    }
  }

}
</script>

<style lang="less" scoped>

.content {
  font-size: 0.25rem;
  .main{
    overflow: auto;
  }
  .tabbar{
    position: fixed;
    left: 0;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    width: 100%;
    height: 0.2rem;
    .weui-bar__item_on{
      span{
        color: #13227a;
      }
    }
    .weui-bar__item{
      span{
        color: #cdcdcd;
      }
    }
    img{
      width: 20px!important;
      height: 20px!important;
    }
  }

}
</style>
