<template>
  <div>
    <div class="header">
      <div>中德冰箱</div>
      <van-icon name="ellipsis" @click="show = true" />
    </div>
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="orders-o" to="/orderForm/overview"
        >定单</van-tabbar-item
      >
      <van-tabbar-item icon="todo-list-o">计划执行</van-tabbar-item>
      <van-tabbar-item icon="stop-circle-o" to="/shutdown">停机</van-tabbar-item>
      <van-tabbar-item icon="certificate">质量</van-tabbar-item>
      <van-tabbar-item icon="points">节拍</van-tabbar-item>
    </van-tabbar>
    <search-popover :show="show" @closePopover="closePopover"></search-popover>
  </div>
</template>
<script>
import SearchPopover from "../components/searchPopover";

export default {
  components: { SearchPopover },
  data() {
    return {
      // 底部菜单active
      active: 0,
      // 右侧筛选条件是否可见
      show: false
    };
  },
  methods: {
      closePopover() {
          this.show = false;
      }
  }
};
</script>
<style lang="scss">
.header {
  background-color: #1890ff;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
}
</style>
