<template>
  <div class="list">
    <h1>{{ title }}</h1>
    <div class="table">
      <div class="thead">
        <div
          v-for="(item, index) in cols"
          :key="index"
          :style="{ width: item.width }"
        >
          {{ item.title }}
        </div>
      </div>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          :name="index"
          v-for="(item, index) in list"
          :key="index"
        >
          <template #title>
            <div
              v-for="(td, tdIndex) in cols"
              :key="tdIndex"
              :style="{ width: td.width }"
            >
              {{ item[td.dataIndex] }}
            </div>
          </template>
          <div
            v-for="(ex, exIndex) in item.expandData"
            :key="exIndex"
            class="flex"
          >
            <div
              v-for="(exCols, exColsIndex) in expandCols"
              :key="exColsIndex"
              :style="{ width: exCols.width }"
              class="wrap expand-item"
            >
              {{ ex[exCols.dataIndex] }}
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
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
    expandCols: {
      type: Array,
    },
  },
  data() {
    return {
      activeNames: [],
    };
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
  .table {
    width: 100%;
    .thead {
      width: calc(100% - 20px);
      display: flex;
    }
    .van-cell {
      padding: 10px 0;
      background-color: #f6f2f2;
      margin: 10px 0;
      border-radius: 30px;
    }
    .van-cell__title {
      display: flex;
    }
    .expand-item {
      border-bottom: 1px solid;
      padding: 5px 0;
    }
  }
}
</style>
