<template>
  <div class="data-view">
    <p class="font12">{{ title }}</p>
    <p class="bold font16">{{ count !== "null" && count !== 'null%' ? count : "--" }}</p>
    <p class="left font12">
      {{ countName }}:
      <span class="font12" :class="diff > 0 ? 'red' : 'green'">{{ diff || "--" }}</span>
    </p>
    <p class="left font12">
      {{ percentName }}:
      <span class="font12" :class="percent > 0 ? 'red' : 'green'">{{ percent || "--" }}%</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    count: {
      type: String,
    },
    countName: {
      type: String,
    },
    percentName: {
      type: String,
    },
    diff: {
      type: Number,
    },
    percent: {
      type: Number,
    },
  },
};
</script>

<style lang="scss">
.data-view {
  p {
    margin: 5px 0;
    &.left {
      text-align: left;
    }
  }
  .van-grid-item__content{
    padding: 16px 4px;
  }
  .van-grid-item__content--center {
    background: linear-gradient(45deg, #ece9e6 0%, #ffffff 100%);
  }
}
</style>
