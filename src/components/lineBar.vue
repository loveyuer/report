<template>
  <div :id="id" style="height:300px;width:95%;margin: 15px auto 0"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    id: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(this.option);
    },
  },
};
</script>
