<template>
  <div class="nav">
    <el-menu
      :default-active="defaultPath"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item v-for="list in menu" :index="list.path" :key="list.path">
        <span slot="title">{{ list.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPath: "/"
    };
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  mounted() {
    let href = window.location.href;
    this.defaultPath = href.split("/#")[1];
  }
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #545c64;
}
.el-menu {
  border: 0;
}
</style>
