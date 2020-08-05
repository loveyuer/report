<template>
  <div>
    <div class="tt">
      <div>数据动态<van-icon name="replay" /></div>
      <div class="grey font12">数据更新时间: 10:31</div>
      <div class="grey font12">单位：台</div>
    </div>
    <div class="grey font12 right" @click="show = true">
      数据说明<van-icon name="info-o" />
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <h1>数据说明</h1>
          <p>当日计划：MES中定单数据，按日期汇总作为计划数据</p>
          <p>昨日：计划数量与昨日相比</p>
          <p>公式：今日-昨日，允许出现负数</p>
          <p>上月比：跟上个月相比，增长或者减少的比率</p>
          <p>公式：（本月-上月）/上月</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据说明
      show: false,
    };
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  height: 100%;
}

.block {
  width: 80%;
  background-color: #fff;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  position: fixed;
  left: 8%;
  top: 10%;
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
