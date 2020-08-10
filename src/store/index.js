import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 开始时间
        startDate: moment().format('YYYY-MM-DD'),
        // 结束时间
        endDate: moment().format('YYYY-MM-DD'),
        // 是否筛选了时间标识
        selectDateFlag: false
    },
    mutations: {
        // 选择开始时间
        setStartDate(state, value) {
            state.startDate = value;
        },
        // 选择结束时间
        setEndDate(state, value) {
            state.endDate = value;
        },
        // 筛选时间
        setSelectDateFlag(state) {
            state.selectDateFlag = !state.selectDateFlag;
        }
    }
})