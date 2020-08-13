<template>
  <div class="list">
    <h1>{{ title }}</h1>
    <van-list v-if="list.length">
      <div class="thead">
        <div v-for="(item, index) in cols" :key="index">{{ item.title }}</div>
      </div>
      <div v-for="(item, index) in list" :key="index" class="tbody">
        <div v-for="(td, tdIndex) in cols" :key="tdIndex">
          {{ td.rate ? `${parseFloat(item[td.dataIndex] * 100).toFixed(2)}%`: item[td.dataIndex] }}
        </div>
      </div>
    </van-list>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    cols: {
      type: Array,
    },
    list: {
      type: Array,
    },
  },
};
</script>
<style lang="scss">
.list {
  margin-bottom: 30px;
  h1 {
    font-weight: bold;
    text-align: left;
    margin: 10px;
  }
  .van-list {
    display: table;
    width: 100%;
    .thead,
    .tbody {
      display: table-row;
      div {
        display: table-cell;
        padding: 8px 3px;
        border-bottom: 1px solid;
      }
    }
  }
}
</style>
