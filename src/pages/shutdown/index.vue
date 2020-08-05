<template>
  <div class="container no-tab-container">
    <header-TT></header-TT>
    <div class="data-view">
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item>
          <data-view
            :title="`当日计划`"
            :count="`1800`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+500"
            :percent="+20"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`当日完成`"
            :count="`900`"
            :countName="`差异`"
            :percentName="`完成率`"
            :diff="-100"
            :percent="+50"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`齐套率`"
            :count="`90`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="+100"
            :percent="-7"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`清单率`"
            :count="`60`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="+98.5"
            :percent="-2"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`变更率`"
            :count="`12%`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+9"
            :percent="-7"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`停机时`"
            :count="`125分钟`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+38"
            :percent="-2"
          ></data-view>
        </van-grid-item>
      </van-grid>
    </div>
    <line-bar :id="shutdownTrendId" :option="shutdownTrendData"></line-bar>
    <list-expand :title="title" :cols="cols" :list="list" :expandCols="expandCols"></list-expand>
  </div>
</template>

<script>
import HeaderTT from "../../components/headerTT.vue";
import DataView from "../../components/countData.vue";
import LineBar from "../../components/lineBar.vue";
import ListExpand from "../../components/listExpand.vue";
export default {
  components: { HeaderTT, DataView, LineBar, ListExpand },
  data() {
    return {
      // 方格内数据
      gridData: [
        {
          title: "当日计划",
          count: "1800",
          diff: "+500",
          diffRate: "20%",
        },
        {
          title: "当日完成",
          count: "900",
          diff: "-100",
          diffRate: "50%",
        },
        {
          title: "齐套率",
          count: "90%",
          diff: "+100",
          diffRate: "7%",
        },
        {
          title: "清单率",
          count: "60%",
          diff: "+98.5%",
          diffRate: "2%",
        },
        {
          title: "变更率",
          count: "12%",
          diff: "+9%",
          diffRate: "7%",
        },
        {
          title: "停机时",
          count: "125分钟",
          diff: "+38",
          diffRate: "2%",
        },
      ],
      // 表格标题
      title: "详情数据",
      // 表格列
      cols: [
        {
          title: "定单号",
          dataIndex: "order",
          width: "40%",
        },
        {
          title: "工作时间",
          dataIndex: "workTime",
          width: "20%",
        },
        {
          title: "停机时间",
          dataIndex: "shutdownTime",
          width: "20%",
        },
        {
          title: "定单号",
          dataIndex: "shutdownRate",
          width: "20%",
        },
      ],
      // 展开表格列
      expandCols: [{dataIndex: 'id', width: '40%'}, {dataIndex: 'code', width: '20%'}, 
      {dataIndex: 'time', width: '20%'}, {dataIndex: 'reason', width: '20%'}],
      // 表格数据
      list: [
        {
          order: "1000679001",
          workTime: "100",
          shutdownTime: "20",
          shutdownRate: "20%",
          expandData: [
            {
              id: "AA1PL306N10XPL5G0445",
              code: "AA1PL306N",
              time: "20",
              reason: "安检仪设备故障",
            },
            {
              id: "AA1PL306N10XPL5G0445",
              code: "AA1PL306N",
              time: "20",
              reason: "安检仪设备故障",
            },
            {
              id: "AA1PL306N10XPL5G0445",
              code: "AA1PL306N",
              time: "20",
              reason: "安检仪设备故障",
            },
          ],
        },
        {
          order: "1000679002",
          workTime: "200",
          shutdownTime: "10",
          shutdownRate: "50%",
          expandData: [
            {
              id: "AA1PL306N10XPL5G0445",
              code: "AA1PL306N",
              time: "20",
              reason: "安检仪设备故障",
            },
            {
              id: "AA1PL306N10XPL5G0445",
              code: "AA1PL306N",
              time: "20",
              reason: "安检仪设备故障",
            },
          ],
        },
        {
          order: "1000679003",
          workTime: "150",
          shutdownTime: "23",
          shutdownRate: "25%",
          expandData: [
            {
              id: "AA1PL306N10XPL5G0445",
              code: "AA1PL306N",
              time: "20",
              reason: "安检仪设备故障",
            },
          ],
        },
      ],
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
