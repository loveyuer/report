<template>
  <div>
    <!-- <header-TT></header-TT> -->
    <div class="data-view">
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item>
          <data-view
            :title="`当日计划`"
            :count="`1800`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+531"
            :percent="+20"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`当日完成`"
            :count="`1700`"
            :countName="`差异`"
            :percentName="`完成率`"
            :diff="-100"
            :percent="-94"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`工程不良`"
            :count="`120`"
            :countName="`昨日`"
            :percentName="`不良率`"
            :diff="+20"
            :percent="7"
          ></data-view>
        </van-grid-item>
        <van-grid-item>
          <data-view
            :title="`停机率`"
            :count="`3%`"
            :countName="`昨日`"
            :percentName="`同比`"
            :diff="+0.1"
            :percent="-0.2"
          ></data-view>
        </van-grid-item>
      </van-grid>
    </div>
    <line-bar :id="hourTrendId" :option="hourTrendData"></line-bar>
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
      title: "生产小时日清列表",
      // 表格列
      cols: [
        {
          title: "产线",
          dataIndex: "productLine",
          width: '16%'
        },
        {
          title: "计划",
          dataIndex: "plan",
          width: '16%'
        },
        {
          title: "完成",
          dataIndex: "actrual",
          width: '16%'
        },
        {
          title: "差异",
          dataIndex: "diff",
          width: '16%'
        },
        {
          title: "UPH",
          dataIndex: "badCount",
          width: '16%'
        },
        {
          title: "直通率",
          dataIndex: "shutdownCount",
          width: '16%'
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
        color: ["#1890ff", "#22d749"],
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
          data: ["计划", "完成"],
          right: 10,
        },
        dataZoom: [
          {
            show: true,
            start: 32,
            end: 40,
          },
          {
            type: "inside",
            realtime: true,
            start: 32,
            end: 40,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: [
              "00:00-01:00",
              "01:00-02:00",
              "02:00-03:00",
              "03:00-04:00",
              "04:00-05:00",
              "05:00-06:00",
              "06:00-07:00",
              "07:00-08:00",
              "08:00-09:00",
              "09:00-10:00",
              "10:00-11:00",
              "11:00-12:00",
              "12:00-13:00",
              "13:00-14:00",
              "14:00-15:00",
              "15:00-16:00",
              "16:00-17:00",
              "17:00-18:00",
              "18:00-19:00",
              "19:00-20:00",
              "20:00-21:00",
              "21:00-22:00",
              "22:00-23:00",
              "23:00-24:00",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "计划",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "完成",
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "计划",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
            ],
          },
          {
            name: "完成",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
            ],
          },
        ],
      },
    };
  },
};
</script>
