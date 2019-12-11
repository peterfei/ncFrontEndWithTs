import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Table, TableColumn, Button } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
