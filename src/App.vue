<template>
  <div id="app">
    <c-nav :menu="menu"></c-nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
export default {
  data() {
    return {
      isRouterAlive: true,
      menu: [
        {
          name: "编辑DCS",
          path: "/"
        },
        {
          name: "新增DCS",
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
<style lang="scss" scoped>
.container {
  position: absolute;
  left: 250px;
  top: 0;
  bottom: 0;
  overflow: auto;
  right: 0;
  padding: 10px;
}
</style>
