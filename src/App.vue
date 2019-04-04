<template>
  <div id="app">
    <c-nav :menu="menu"></c-nav>
    <router-view />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
export default {
  data() {
    return {
      menu: [
        {
          name: "查看修改DSC",
          path: "/home"
        },
        {
          name: "新增DSC",
          path: "/addDscInfo"
        }
      ]
    };
  },
  components: {
    "c-nav": Nav
  }
};
</script>
