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
            <van-tag
              type="primary"
              plain
              size="large"
              @click="chooseDate('today')"
              >今日</van-tag
            >
            <van-tag
              type="primary"
              plain
              size="large"
              @click="chooseDate('yestoday')"
              >昨日</van-tag
            >
            <van-tag
              type="primary"
              plain
              size="large"
              @click="chooseDate('three')"
              >近3天</van-tag
            >
            <van-tag
              type="primary"
              plain
              size="large"
              @click="chooseDate('week')"
              >近一周</van-tag
            >
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
                v-model="currentDate"
                :min-date="startMinDate"
                :max-date="startMaxDate"
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
                v-model="currentDate"
                :min-date="endMinDate"
                :max-date="endMaxDate"
                @confirm="confirmEnd"
                @cancle="endDatePicker = false"
              />
            </van-popup>
          </div>
        </div>
        <!-- <div class="filter-wrap">
          <label>类型</label>
          <div class="tag-wrap">
            <van-tag type="primary" plain size="large">全部</van-tag>
            <van-tag type="primary" plain size="large">内销</van-tag>
            <van-tag type="primary" plain size="large">外销</van-tag>
            <van-tag type="primary" plain size="large">样机</van-tag>
            <van-tag type="primary" plain size="large">散件</van-tag>
          </div>
        </div> -->
        <div class="btn-wrapper">
          <van-button type="info" size="small" @click="confirm"
            >确定</van-button
          >
          <van-button type="info" size="small" @click="reset">重置</van-button>
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
    // 检索条件是否可见
    visible: {
      get() {
        return this.show;
      },
      set() {
        this.closePopover();
      },
    },
    startMinDate() {
      const date = this.$moment(this.endDate).subtract("days", 30);
      const { year, month, day } = this.formatter(date);
      return new Date(year, month, day);
    },
    startMaxDate() {
      const { year, month, day } = this.formatter(this.endDate);
      return new Date(year, month, day);
    },
    endMinDate() {
      const { year, month, day } = this.formatter(this.startDate);
      return new Date(year, month, day);
    },
    endMaxDate() {
      const date = this.$moment(this.startDate).add("days", 30);
      const { year, month, day } = this.formatter(date);
      return new Date(year, month, day);
    },
  },
  data() {
    return {
      // 开始时间
      startDate: this.$store.state.startDate,
      // 结束时间
      endDate: this.$store.state.endDate,
      // 开始日期选择框
      startDatePicker: false,
      // 结束日期选择框
      endDatePicker: false,
      currentDate: new Date(),
    };
  },
  methods: {
    // 弹窗关闭事件
    closePopover() {
      this.$emit("closePopover");
    },
    // 开始日期选择
    confirmStart(val) {
      this.startDate = this.$moment(val).format("YYYY-MM-DD");
      this.startDatePicker = false;
    },
    // 结束日期选择
    confirmEnd(val) {
      this.endDate = this.$moment(val).format("YYYY-MM-DD");
      this.endDatePicker = false;
    },
    // 确定选择
    confirm() {
      this.$store.commit("setStartDate", this.startDate);
      this.$store.commit("setEndDate", this.endDate);
      this.$store.commit("setSelectDateFlag");
      this.closePopover();
    },
    // 重置日期
    reset() {
      this.startDate = this.$moment().format("YYYY-MM-DD");
      this.endDate = this.$moment().format("YYYY-MM-DD");
      this.confirm();
    },
    // 时间标签筛选
    chooseDate(type) {
      if (type === "today") {
        this.startDate = this.$moment().format("YYYY-MM-DD");
        this.endDate = this.$moment().format("YYYY-MM-DD");
      } else if (type === 'yestoday') {
        this.startDate = this.$moment().subtract("days", 1).format("YYYY-MM-DD");
        this.endDate = this.$moment().subtract("days", 1).format("YYYY-MM-DD");
      } else if (type === 'three') {
        this.startDate = this.$moment().subtract("days", 2).format("YYYY-MM-DD");
        this.endDate = this.$moment().format("YYYY-MM-DD");
      } else if (type === 'week') {
        this.startDate = this.$moment().subtract("days", 6).format("YYYY-MM-DD");
        this.endDate = this.$moment().format("YYYY-MM-DD");
      }
      this.confirm();
    },
    // 日期格式化
    formatter(value) {
      const date = new Date(this.$moment(value).format("YYYY-MM-DD"));
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year,
        month,
        day,
      };
    },
  },
};
</script>
<style lang="scss">
.van-tag {
  margin-right: 5px;
}
.filter-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  .tag-wrap {
    margin: 10px 0;
  }
}
.btn-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  .van-button {
    width: 50%;
  }
}
</style>
