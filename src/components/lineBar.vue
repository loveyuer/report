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
    refresh: {
      type: Boolean
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    refresh() {
      this.init();
    }
  },
  methods: {
    init() {
      if (this.option.xAxis[0].data.length) {
        let myChart = echarts.init(document.getElementById(this.id));
        myChart.setOption(this.option);
      } else {
        var html = `<div style="margin-bottom: -300px"><div style="font-weight: bold;text-align: left;margin: 10px 0;">${this.option.title.text}</div><div class="no-data" style="margin-top: 100px">暂无数据</div></div>`
        document.getElementById(this.id).innerHTML = html
        document.getElementById(this.id).removeAttribute('_echarts_instance_')
      }
    },
  },
};
</script>
