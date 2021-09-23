import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import HtEditor from '../packages/index';
Vue.use(HtEditor);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
