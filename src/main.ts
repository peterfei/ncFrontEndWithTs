import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components/plugins/element";
import './assets/style/base/golbal.scss';
import './assets/style/iconfont/iconfont.css';
Vue.config.productionTip = false;
import qs from "qs"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
