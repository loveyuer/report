import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router';
import './rem'
import Vant from 'vant';
import 'vant/lib/index.css';
import './styles/reset.scss';
import './styles/common.scss';

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
