<template>
  <div>
    <div class="data-view">
      <van-grid :column-num="2" :gutter="25">
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
            :percent="
              parseFloat(overviewData.completeRate * 100)
            "
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`工程不良`"
            :count="`${overviewData.badSets}`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="overviewData.comparedToQualityYesterday"
            :percent="
              parseFloat(overviewData.defectiveRate * 100)
            "
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
      </van-grid>
    </div>
    <line-bar :id="hourTrendId" :option="hourTrendData" :refresh="refresh"></line-bar>
    <list-expand
      :title="title"
      :cols="cols"
      :list="list"
      :expandCols="expandCols"
    ></list-expand>
  </div>
</template>

<script>
import { orderOverview, hourProduction } from "../../api/index";
import DataView from "../../components/countData.vue";
import LineBar from "../../components/lineBar.vue";
import ListExpand from "../../components/listExpand.vue";
export default {
  components: { DataView, LineBar, ListExpand },
  data() {
    return {
      // 概览数据
      overviewData: {},
      // 表格标题
      title: "生产小时日清列表",
      // 表格列
      cols: [
        {
          title: "产线",
          dataIndex: "productLine",
          width: "16%",
        },
        {
          title: "计划",
          dataIndex: "plan",
          width: "16%",
        },
        {
          title: "完成",
          dataIndex: "actrual",
          width: "16%",
        },
        {
          title: "差异",
          dataIndex: "diff",
          width: "16%",
        },
        {
          title: "UPH",
          dataIndex: "badCount",
          width: "16%",
        },
        {
          title: "直通率",
          dataIndex: "shutdownCount",
          width: "16%",
        },
      ],
      // 展开表格列
      expandCols: [
        { dataIndex: "hours", width: "16%" },
        { dataIndex: "plan", width: "16%" },
        { dataIndex: "actrual", width: "16%" },
        { dataIndex: "diff", width: "16%" },
        { dataIndex: "UPH", width: "16%" },
        { dataIndex: "shutdownCount", width: "16%" },
      ],
      // 表格数据
      list: [
        {
          productLine: "01线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          shutdownCount: "3.9%",
          expandData: [
            {
              hours: "08:00-09:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
            {
              hours: "09:00-10:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
            {
              hours: "10:00-11:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
          ],
        },
        {
          productLine: "02线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          shutdownCount: "3.9%",
          expandData: [
            {
              hours: "08:00-09:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
            {
              hours: "09:00-10:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
            {
              hours: "10:00-11:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
          ],
        },
        {
          productLine: "03线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          shutdownCount: "3.9%",
          expandData: [
            {
              hours: "08:00-09:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
            {
              hours: "09:00-10:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
            {
              hours: "10:00-11:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
              shutdownCount: "96.5%",
            },
          ],
        },
      ],
      // 日产量趋势图id
      hourTrendId: "hourTrend",
      // 日产量趋势图数据
      hourTrendData: {
        color: ["#1890ff"],
        title: {
          text: "小时产量趋势图",
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
          data: ["产量"],
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
            name: '小时段',
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产量",
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "产量",
            type: "bar",
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
  created() {
    this.getOverview();
    this.getHour();
  },
  watch: {
    dateFlag() {
      this.getOverview();
      this.getHour();
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
    // 获取小时产量趋势图数据
    getHour() {
      hourProduction({
        factoryCode: "1007",
        startDate: this.$store.state.startDate,
        endDate: this.$store.state.endDate,
      }).then((res) => {
        this.hourTrendData.xAxis[0].data = [];
        this.hourTrendData.series.map((item) => (item.data = []));
        res.data.data.map((item) => {
          this.hourTrendData.xAxis[0].data.push(item.timeSlot);
          this.hourTrendData.series[0].data.push(item.production);
        });
        this.refresh = !this.refresh;
      });
    },
  },
};
</script>
