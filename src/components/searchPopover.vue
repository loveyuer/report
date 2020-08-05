<template>
  <div>
    <van-popup
      v-model="visible"
      @close="closePopover"
      position="right"
      :style="{ width: '70%', height: '100%' }"
    >
      <div>
        <div class="filter-wrap">
          <label>时间</label>
          <div class="tag-wrap">
            <van-tag type="primary" plain size="large">今日</van-tag>
            <van-tag type="primary" plain size="large">昨日</van-tag>
            <van-tag type="primary" plain size="large">近3天</van-tag>
            <van-tag type="primary" plain size="large">近一周</van-tag>
          </div>
          <div style="margin: 0 -16px">
            <van-field
              readonly
              clickable
              name="datetimePicker"
              :value="startDate"
              label="开始时间"
              placeholder="点击选择时间"
              @click="startDatePicker = true"
            />
            <van-popup
              v-model="startDatePicker"
              position="bottom"
              get-container="#app"
            >
              <van-datetime-picker
                type="date"
                title="选择年月日"
                @confirm="confirmStart"
                @cancle="startDatePicker = false"
              />
            </van-popup>
            <van-field
              readonly
              clickable
              name="datetimePicker"
              :value="endDate"
              label="结束时间"
              placeholder="点击选择时间"
              @click="endDatePicker = true"
            />
            <van-popup
              v-model="endDatePicker"
              position="bottom"
              get-container="#app"
            >
              <van-datetime-picker
                title="选择年月日"
                type="date"
                @confirm="confirmEnd"
                @cancle="endDatePicker = false"
              />
            </van-popup>
          </div>
        </div>
        <div class="filter-wrap">
          <label>类型</label>
          <div class="tag-wrap">
            <van-tag type="primary" plain size="large">全部</van-tag>
            <van-tag type="primary" plain size="large">内销</van-tag>
            <van-tag type="primary" plain size="large">外销</van-tag>
            <van-tag type="primary" plain size="large">样机</van-tag>
            <van-tag type="primary" plain size="large">散件</van-tag>
          </div>
        </div>
        <div class="btn-wrapper">
          <van-button type="info" size="small">确定</van-button>
          <van-button type="info" size="small">重置</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    // 右侧筛选条件是否可见
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set() {
        this.closePopover();
      },
    },
  },
  data() {
    return {
      // 开始日期
      startDate: "",
      // 结束日期
      endDate: "",
      // 开始日期选择框
      startDatePicker: false,
      // 结束日期选择框
      endDatePicker: false,
    };
  },
  methods: {
    // 弹窗关闭事件
    closePopover() {
      this.$emit("closePopover");
    },
    // 开始日期选择
    confirmStart(val) {
      this.startDate = this.format(val);
      this.startDatePicker = false;
    },
    // 结束日期选择
    confirmEnd(val) {
      this.endDate = this.format(val);
      this.endDatePicker = false;
    },
    // 日期格式化
    format(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      return  `${year}-${month}-${day}`
    },
  },
};
</script>
<style lang="scss">
.van-tag {
  margin-right: 5px;
}
.filter-wrap{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    .tag-wrap{
        margin: 10px 0
    }
}
.btn-wrapper{
    position: absolute;
    bottom: 0;
    width: 100%;
    .van-button{
        width: 50%;
    }
}
</style>
