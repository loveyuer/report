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
            :percent="parseFloat(overviewData.completeRate * 100)"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`工程不良`"
            :count="`${overviewData.badSets}`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="overviewData.comparedToQualityYesterday"
            :percent="parseFloat(overviewData.defectiveRate * 100)"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`停机率`"
            :count="
              `${parseFloat(overviewData.downtimerate * 100).toFixed(2)}%`
            "
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="overviewData.comparedToDowntimeYesterday"
            :percent="overviewData.lastMonthDowntimerate"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`计划变更率`"
            :count="
              `${parseFloat(overviewData.changeOfPlanRate * 100).toFixed(2)}%`
            "
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="overviewData.comparedToChangeplanYesterday"
            :percent="overviewData.lastMonthChangeplanRate"
          ></data-view>
        </van-grid-item>
      </van-grid>
    </div>
    <v-list :title="title" :cols="cols" :list="list"></v-list>
    <line-bar
      :id="dailyTrendId"
      :option="dailyTrendData"
      :refresh="refreshDailyTrend"
    ></line-bar>
    <line-bar
      :id="shutdownTrendId"
      :option="shutdownTrendData"
      :refresh="refreshShutdownTrend"
    ></line-bar>
    <line-bar
      :id="planTrendId"
      :option="planTrendData"
      :refresh="refreshPlanTrend"
    ></line-bar>
  </div>
</template>

<script>
import "../../store/index";
import { orderOverview, orderList } from "../../api/index";
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
          dataIndex: "lineName",
        },
        {
          title: "计划",
          dataIndex: "linePlannedOutput",
        },
        {
          title: "实际",
          dataIndex: "lineActualOutput",
        },
        {
          title: "差异",
          dataIndex: "discrepancy",
        },
        {
          title: "不良数",
          dataIndex: "poorEngineering",
        },
        {
          title: "不良率",
          dataIndex: "defectiveRate",
          rate: true,
        },
        {
          title: "停机时",
          dataIndex: "downTime",
        },
        {
          title: "停机率",
          dataIndex: "downTimeRate",
          rate: true,
        },
      ],
      // 表格数据
      list: [],
      // 是否重新渲染日产量趋势图echarts
      refreshDailyTrend: true,
      // 是否重新渲染日产量趋势图echarts
      refreshShutdownTrend: true,
      // 是否重新渲染日产量趋势图echarts
      refreshPlanTrend: true,
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
        dataZoom: [
          {
            show: true,
          },
          {
            type: "inside",
            realtime: true,
          },
        ],
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
            name: "计划",
            type: "bar",
            data: [],
          },
          {
            name: "实际",
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
        dataZoom: [
          {
            show: true,
          },
          {
            type: "inside",
            realtime: true,
          },
        ],
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
            name: "分",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "停机率",
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "停机时间",
            type: "bar",
            data: [],
          },
          {
            name: "停机率",
            type: "line",
            yAxisIndex: 1,
            data: [],
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
          data: ["定单条数", "变更数量", "变更率"],
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
            name: "变更率",
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
            name: "变更数量",
            type: "bar",
            data: [],
          },
          {
            name: "变更率",
            type: "line",
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
    };
  },
  created() {
    this.getOverview();
    this.getList();
  },
  computed: {
    dateFlag() {
      return this.$store.state.selectDateFlag;
    },
  },
  watch: {
    dateFlag() {
      this.getOverview();
      this.getList();
    },
  },
  methods: {
    // 获取概览数据
    getOverview() {
      orderOverview({
        factoryCode: "1007",
        startDate: this.$store.state.startDate,
        endDate: this.$store.state.endDate,
      }).then((res) => {
        this.overviewData = res.data.data;
      });
    },
    // 获取详情数据列表
    getList() {
      orderList({
        factoryCode: "1007",
        startDate: this.$store.state.startDate,
        endDate: this.$store.state.endDate,
      }).then((res) => {
        this.list = res.data.data;
        this.handleProduction();
        this.handleShutdown();
        this.handlePlan();
      });
    },
    // 日产量趋势图数据处理
    handleProduction() {
      this.dailyTrendData.xAxis[0].data = [];
      this.dailyTrendData.series.map((item) => (item.data = []));
      this.list.map((item) => {
        this.dailyTrendData.xAxis[0].data.push(item.lineName);
        this.dailyTrendData.series[0].data.push(item.linePlannedOutput);
        this.dailyTrendData.series[1].data.push(item.lineActualOutput);
        this.dailyTrendData.series[2].data.push(
          parseFloat(item.linePlannedOutput * 100).toFixed(2)
        );
      });
      this.refreshDailyTrend = !this.refreshDailyTrend;
    },
    // 停机时趋势图数据处理
    handleShutdown() {
      this.shutdownTrendData.xAxis[0].data = [];
      this.shutdownTrendData.series.map((item) => (item.data = []));
      this.list.map((item) => {
        this.shutdownTrendData.xAxis[0].data.push(item.lineName);
        this.shutdownTrendData.series[0].data.push(item.downTime);
        this.shutdownTrendData.series[1].data.push(
          parseFloat(item.downTimeRate * 100).toFixed(2)
        );
      });
      this.refreshShutdownTrend = !this.refreshShutdownTrend;
    },
    // 计划变更趋势图数据处理
    handlePlan() {
      this.planTrendData.xAxis[0].data = [];
      this.planTrendData.series.map((item) => (item.data = []));
      this.list.map((item) => {
        this.planTrendData.xAxis[0].data.push(item.lineName);
        this.planTrendData.series[0].data.push(item.plannedNumber);
        this.planTrendData.series[1].data.push(item.plannedChangesNumber);
        this.planTrendData.series[2].data.push(
          parseFloat(item.changePlanRate * 100).toFixed(2)
        );
      });
      this.refreshPlanTrend = !this.refreshPlanTrend;
    },
  },
};
</script>
