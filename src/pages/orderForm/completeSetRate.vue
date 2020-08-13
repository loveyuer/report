<template>
  <div>
    <!-- <header-TT></header-TT> -->
    <div class="data-view">
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item>
          <data-view
            :title="`定单数量`"
            :count="`1800`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+531"
            :percent="+20"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`齐套数量`"
            :count="`1700`"
            :countName="`差异`"
            :percentName="`完成率`"
            :diff="-100"
            :percent="-94"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`差异`"
            :count="`120`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="+20"
            :percent="7"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`齐套率`"
            :count="`3%`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+0.1"
            :percent="-0.2"
          ></data-view>
        </van-grid-item>
      </van-grid>
    </div>
    <line-bar :id="completeSetRate" :option="completeSetRateData" :refresh="refresh"></line-bar>
    <list-expand
      :title="title"
      :cols="cols"
      :list="list"
      :expandCols="expandCols"
    ></list-expand>
  </div>
</template>

<script>
import { setRateTrend } from "../../api/index";
import DataView from "../../components/countData.vue";
import LineBar from "../../components/lineBar.vue";
import ListExpand from "../../components/listExpand.vue";
export default {
  components: { DataView, LineBar, ListExpand },
  data() {
    return {
      // 表格标题
      title: "定单齐套率",
      // 表格列
      cols: [
        {
          title: "订单号",
          dataIndex: "lineName",
          width: "40%",
        },
        {
          title: "计划",
          dataIndex: "plannedNumber",
          width: "15%",
        },
        {
          title: "齐套",
          dataIndex: "completedNumber",
          width: "15%",
        },
        {
          title: "差异",
          dataIndex: "diff",
          width: "15%",
        },
        {
          title: "齐套率",
          dataIndex: "setRate",
          width: "15%",
        },
      ],
      // 展开表格列
      expandCols: [
        { dataIndex: "orderNo", width: "40%" },
        { dataIndex: "plan", width: "15%" },
        { dataIndex: "qtQua", width: "15%" },
        { dataIndex: "diff", width: "15%" },
        { dataIndex: "qitaoPer", width: "15%" },
      ],
      // 表格数据
      list: [],
      // 齐套率分析id
      completeSetRate: "completeSetRate",
      // 齐套率分析
      completeSetRateData: {
        color: ["#1890ff", "#22d749", "#fa8355"],
        title: {
          text: "齐套率分析",
          textStyle: {
            fontSize: 14,
            color: "#2c3e50",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        dataZoom: [
          {
            show: true,
          },
          {
            type: "inside",
            realtime: true,
          },
        ],
        legend: {
          data: ["定单条数", "完成条数", "条数完成率"],
          right: 10,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "完成率",
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "定单条数",
            type: "bar",
            data: [],
          },
          {
            name: "完成条数",
            type: "bar",
            data: [],
          },
          {
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
      // 时间查询标识
      refresh: false
    };
  },
  computed: {
    dateFlag() {
      return this.$store.state.selectDateFlag;
    },
  },
  watch: {
    dateFlag() {
      this.getSetRateTrend();
    },
  },
  created() {
    this.getSetRateTrend();
  },
  methods: {
    getSetRateTrend() {
      setRateTrend({
        factoryCode: "1007",
        startDate: this.$store.state.startDate,
        endDate: this.$store.state.endDate,
      }).then((res) => {
        this.completeSetRateData.xAxis[0].data = [];
        this.completeSetRateData.series.map((item) => (item.data = []));
        res.data.data.map((item) => {
          this.completeSetRateData.xAxis[0].data.push(item.lineName);
          this.completeSetRateData.series[0].data.push(item.plannedNumber);
          this.completeSetRateData.series[1].data.push(item.completedNumber);
          this.completeSetRateData.series[2].data.push(
            parseFloat(item.setrate * 100).toFixed(2)
          );
        });
        this.refresh = !this.refresh;
      });
    },
  },
};
</script>
