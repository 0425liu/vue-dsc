import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { post, get } from "@/assets/js/http";
import "scss/reset.scss";
import "assets/iconfont/iconfont.css";
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
