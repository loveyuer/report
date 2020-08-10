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
    <line-bar :id="completeSetRate" :option="completeSetRateData"></line-bar>
    <list-expand
      :title="title"
      :cols="cols"
      :list="list"
      :expandCols="expandCols"
    ></list-expand>
  </div>
</template>

<script>
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
          dataIndex: "productLine",
          width: '40%'
        },
        {
          title: "计划",
          dataIndex: "plan",
          width: '15%'
        },
        {
          title: "齐套",
          dataIndex: "actrual",
          width: '15%'
        },
        {
          title: "差异",
          dataIndex: "diff",
          width: '15%'
        },
        {
          title: "齐套率",
          dataIndex: "badCount",
          width: '15%'
        },
      ],
      // 展开表格列
      expandCols: [
        { dataIndex: "hours", width: "40%" },
        { dataIndex: "plan", width: "15%" },
        { dataIndex: "actrual", width: "15%" },
        { dataIndex: "diff", width: "15%" },
        { dataIndex: "UPH", width: "15%" },
      ],
      // 表格数据
      list: [
        {
          productLine: "01线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          expandData: [
            {
              hours: "08:00-09:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
            {
              hours: "09:00-10:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
            {
              hours: "10:00-11:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
          ],
        },
        {
          productLine: "02线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          expandData: [
            {
              hours: "08:00-09:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
            {
              hours: "09:00-10:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
            {
              hours: "10:00-11:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
          ],
        },
        {
          productLine: "03线",
          plan: "300",
          actrual: "315",
          diff: "15",
          badCount: "12",
          expandData: [
            {
              hours: "08:00-09:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
            {
              hours: "09:00-10:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
            {
              hours: "10:00-11:00",
              plan: "120",
              actrual: "100",
              diff: "20",
              UPH: "260",
            },
          ],
        },
      ],
      // 齐套率分析id
      completeSetRate: "completeSetRate",
      // 定单条数清单率
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
    };
  },
};
</script>
