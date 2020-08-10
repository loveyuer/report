<template>
  <div>
    <div class="data-view">
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item>
          <data-view
            :title="`当日计划`"
            :count="`${overviewData.factoryPlannedOutput}`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="overviewData.comparedToPlanYesterday"
            :percent="overviewData.lastMonthPlanrate"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`当日完成`"
            :count="`${overviewData.factoryActualOutput}`"
            :countName="`差异`"
            :percentName="`完成率`"
            :diff="overviewData.discrepancy"
            :percent="overviewData.completeRate"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`工程不良`"
            :count="`${overviewData.badSets}`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="overviewData.comparedToQualityYesterday"
            :percent="overviewData.defectiveRate"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`停机率`"
            :count="`${overviewData.downtimerate}%`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="overviewData.comparedToDowntimeYesterday"
            :percent="overviewData.lastMonthDowntimerate"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`计划变更率`"
            :count="`${overviewData.changeOfPlanRate}%`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="overviewData.comparedToChangeplanYesterday"
            :percent="overviewData.lastMonthChangeplanRate"
          ></data-view>
        </van-grid-item>
      </van-grid>
    </div>
    <v-list :title="title" :cols="cols" :list="list"></v-list>
    <line-bar :id="dailyTrendId" :option="dailyTrendData"></line-bar>
    <line-bar :id="shutdownTrendId" :option="shutdownTrendData"></line-bar>
    <line-bar :id="planTrendId" :option="planTrendData"></line-bar>
  </div>
</template>

<script>
import "../../store/index";
import { orderOverview } from "../../api/index";
import DataView from "../../components/countData.vue";
import VList from "../../components/list.vue";
import LineBar from "../../components/lineBar.vue";
export default {
  components: { DataView, VList, LineBar },
  data() {
    return {
      // 概览数据
      overviewData: {},
      // 表格标题
      title: "详情数据",
      // 表格列
      cols: [
        {
          title: "生产线",
          dataIndex: "productLine",
        },
        {
          title: "计划",
          dataIndex: "plan",
        },
        {
          title: "实际",
          dataIndex: "actrual",
        },
        {
          title: "差异",
          dataIndex: "diff",
        },
        {
          title: "不良数",
          dataIndex: "badCount",
        },
        {
          title: "不良率",
          dataIndex: "badRate",
        },
        {
          title: "停机时",
          dataIndex: "shutdownCount",
        },
        {
          title: "停机率",
          dataIndex: "shutdownRate",
        },
      ],
      // 表格数据
      list: [
        {
          productLine: "01线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          badRate: "3.9%",
          shutdownCount: "22",
          shutdownRate: "0.5%",
        },
        {
          productLine: "02线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          badRate: "3.9%",
          shutdownCount: "22",
          shutdownRate: "0.5%",
        },
        {
          productLine: "03线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          badRate: "3.9%",
          shutdownCount: "22",
          shutdownRate: "0.5%",
        },
        {
          productLine: "04线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          badRate: "3.9%",
          shutdownCount: "22",
          shutdownRate: "0.5%",
        },
        {
          productLine: "05线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          badRate: "3.9%",
          shutdownCount: "22",
          shutdownRate: "0.5%",
        },
      ],
      // 日产量趋势图id
      dailyTrendId: "dailyTrend",
      // 日产量趋势图数据
      dailyTrendData: {
        color: ["#1890ff", "#22d749", "#fa8355"],
        title: {
          text: "日产量趋势图",
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
        legend: {
          data: ["计划", "实际", "完成率"],
          right: 10,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "01线",
              "02线",
              "03线",
              "04线",
              "05线",
              "06线",
              "07线",
              "08线",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "完成率",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "计划",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
          },
          {
            name: "实际",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2],
          },
          {
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4],
          },
        ],
      },
      // 停机时趋势图id
      shutdownTrendId: "shutdownTrend",
      // 停机时趋势图数据
      shutdownTrendData: {
        color: ["#1890ff", "#fa8355"],
        title: {
          text: "停机时趋势图",
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
        legend: {
          data: ["停机时间", "停机率"],
          right: 10,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "01线",
              "02线",
              "03线",
              "04线",
              "05线",
              "06线",
              "07线",
              "08线",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "分",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "停机率",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "停机时间",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
          },
          {
            name: "停机率",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4],
          },
        ],
      },
      // 计划变更趋势图id
      planTrendId: "planTrend",
      // 日计划变更趋势图数据
      planTrendData: {
        color: ["#1890ff", "#22d749", "#fa8355"],
        title: {
          text: "计划变更趋势图",
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
        legend: {
          data: ["定单数量", "变更数量", "变更率"],
          right: 10,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "01线",
              "02线",
              "03线",
              "04线",
              "05线",
              "06线",
              "07线",
              "08线",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "变更率",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "定单数量",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
          },
          {
            name: "变更数量",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2],
          },
          {
            name: "变更率",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4],
          },
        ],
      },
    };
  },
  created() {
    this.getOverview();
  },
  computed: {
    dateFlag() {
      return this.$store.state.selectDateFlag;
    }
  },
  watch: {
    dateFlag() {
      this.getOverview();
    },
  },
  methods: {
    getOverview() {
      orderOverview({
        factoryCode: "1007",
        startDate: this.$store.state.startDate,
        endDate: this.$store.state.endDate,
      }).then((res) => {
        this.overviewData = res.data.data;
      });
    },
  },
};
</script>
