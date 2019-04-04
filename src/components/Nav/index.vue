<template>
  <div class="nav">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item v-for="list in menu" :index="list.path" :key="list.path">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ list.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 250px;
}
</style>
