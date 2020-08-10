<template>
  <div class="container">
    <header-TT></header-TT>
    <van-tabs v-model="active" animated class="tabs">
      <van-tab title="数据概览">
        <v-overview></v-overview>
      </van-tab>
      <van-tab title="小时产量">
        <v-hour></v-hour>
      </van-tab>
      <van-tab title="产量日报">内容 3</van-tab>
      <van-tab title="清单分析">
        <inventory-analysis></inventory-analysis>
      </van-tab>
      <van-tab title="齐套率分析">
        <comeplete-setrate></comeplete-setrate>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import VOverview from "./overview.vue";
import VHour from "./hourlyProduction.vue";
import InventoryAnalysis from './inventoryAnalysis.vue';
import ComepleteSetrate from './completeSetRate.vue';
import HeaderTT from "../../components/headerTT.vue";

export default {
  components: { HeaderTT, VOverview, VHour, InventoryAnalysis, ComepleteSetrate },
  data() {
    return {
      // tab
      active: 0,
    };
  },
};
</script>
<style lang="scss">
.tabs {
  .van-tabs__wrap {
    position: fixed;
    z-index: 2;
    top: 39px;
    width: 100%;
  }
  // .van-tabs__content{
  //   margin-top: 80px;
  // }
}
.van-tab__text {
  font-size: 14px;
}
.van-tabs__line {
  background-color: #1890ff;
}
</style>
