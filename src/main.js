import Vue from 'vue';
import Vant from 'vant';
import moment from 'moment';
import App from './App.vue'
import store from './store/index';
import { router } from './router/router';
import './rem'
import 'vant/lib/index.css';
import './styles/reset.scss';
import './styles/common.scss';

Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
