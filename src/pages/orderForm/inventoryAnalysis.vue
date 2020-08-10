<template>
  <div class="container">
    <!-- <header-TT></header-TT> -->
    <div class="data-view">
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item>
          <data-view
            :title="`订单条数`"
            :count="`1800`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+500"
            :percent="+20"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`条数完工`"
            :count="`900`"
            :countName="`差异`"
            :percentName="`完成率`"
            :diff="-100"
            :percent="+50"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`条数清单率`"
            :count="`90`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="+100"
            :percent="-7"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`定单台数`"
            :count="`5000`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="+500"
            :percent="20"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`台数完工`"
            :count="`4000`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="-1000"
            :percent="80"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`台数清单率`"
            :count="`80%`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+100"
            :percent="-7"
          ></data-view>
        </van-grid-item>
      </van-grid>
    </div>
    <line-bar :id="piecesNumberPercent" :option="piecesNumberPercentData"></line-bar>
    <line-bar :id="setsNumberPercent" :option="setsNumberPercentData"></line-bar>
  </div>
</template>

<script>
import DataView from "../../components/countData.vue";
import LineBar from "../../components/lineBar.vue";
export default {
  components: { DataView, LineBar },
  data() {
    return {
      // 定单条数清单率id
      piecesNumberPercent: "piecesNumberPercent",
      // 定单条数清单率
      piecesNumberPercentData: {
        color: ["#1890ff", "#22d749", "#fa8355"],
        title: {
          text: "订单条数清单率",
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
          data: ["定单条数", "完成条数", "条数完成率"],
          right: 10,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "总装一线",
              "总装二线",
              "总装三线",
              "总装四线",
              "总装五线",
              "总装六线",
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
            data: [25, 40, 10, 16, 25, 5,],
          },
          {
            name: "完成条数",
            type: "bar",
            data: [26, 59, 90, 26, 28, 70,],
          },
          {
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2,],
          },
        ],
      },
      // 定单台数清单率id
      setsNumberPercent: "setsNumberPercent",
      // 定单台数清单率
      setsNumberPercentData: {
        color: ["#1890ff", "#22d749", "#fa8355"],
        title: {
          text: "定单台数清单率",
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
          data: ["定单台数", "完成台数", "台数完成率"],
          right: 10,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "总装一线",
              "总装二线",
              "总装三线",
              "总装四线",
              "总装五线",
              "总装六线",
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
            name: "定单台数",
            type: "bar",
            data: [25, 40, 10, 16, 25, 5,],
          },
          {
            name: "完成台数",
            type: "bar",
            data: [26, 59, 90, 26, 28, 70,],
          },
          {
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2,],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
.no-tab-container {
  .tt {
    margin-top: 35px;
  }
  .block {
    top: 30%;
  }
}
</style>
