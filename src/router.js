import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/addDscInfo",
      name: "addDscInfo",
      component: () =>
        import(/* webpackChunkName: "addDscInfo" */ "./views/AddDscInfo/AddDscInfo.vue")
    }
  ]
});
