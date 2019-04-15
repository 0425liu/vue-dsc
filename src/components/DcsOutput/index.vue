<template>
  <div id="DCS">
    <img :src="src" @dragstart.prevent />
    <div
      v-for="(item, index) in data"
      :key="item.key"
      :class="item.class"
      v-drag="{ move: movePos, hasEvent: hasEvent }"
      @click="handleClick(index)"
    >
      <div v-html="item.html" :title="item.key"></div>

      <i
        class="el-icon-error"
        v-if="index === current && hasEvent"
        @click.stop="handleDelete"
        @mousedown.stop
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    data: Array,
    current: Number,
    hasEvent: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  methods: {
    handleClick(index) {
      if (this.hasEvent) {
        this.$emit("handleClick", index);
      }
    },
    handleDelete() {
      if (this.hasEvent) {
        this.$emit("handleDelete");
      }
    },
    movePos(x, y) {
      this.data[this.current].left = x;
      this.data[this.current].top = y;
    }
  },
  directives: {
    drag(el, binding) {
      el.onmousedown = function(e) {
        console.log(binding.value.hasEvent);
        if (!binding.value.hasEvent) return false;
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        el.style.cursor = "move";
        document.onmousemove = function(e) {
          let x = e.pageX - disx + "px";
          let y = e.pageY - disy + "px";
          el.style.left = x;
          el.style.top = y;
          binding.value.move(x, y);
        };
        document.onmouseup = function() {
          el.style.cursor = "default";
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#DCS {
  position: relative;
  user-select: none;
}
</style>
