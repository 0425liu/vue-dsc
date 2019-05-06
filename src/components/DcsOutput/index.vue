<template>
  <div id="DCS">
    <img :src="src" @dragstart.prevent />
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="item.class"
      :style="{ left: item.left, top: item.top }"
      v-drag="{
        move: movePos,
        hasEvent: hasEvent,
        clickHandle: handleClick.bind(this, index)
      }"
      @click="handleClick(index)"
    >
      <div v-html="item.html" :title="item.key"></div>
      <i
        class="el-icon-edit"
        v-if="index === current && hasEvent"
        @click.stop="handleEdit"
        @mousedown.stop
      ></i>
      <i
        class="el-icon-error"
        v-if="index === current && hasEvent"
        @click.stop="handleDelete"
        @mousedown.stop
      ></i>
    </div>
    <el-dialog title="测点ID" :visible.sync="dialogVisible" width="30%">
      <el-input
        v-model="dialogId"
        placeholder="文字测点ID"
        class="input"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogId: ""
    };
  },
  props: {
    src: String,
    data: Array,
    current: Number,
    hasEvent: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  methods: {
    handleClick(index) {
      if (this.hasEvent) {
        this.$emit("handleClick", index);
        console.log(index);
      }
    },
    handleDelete() {
      if (this.hasEvent) {
        this.$emit("handleDelete");
      }
    },
    handleEdit() {
      if (this.hasEvent) {
        this.dialogVisible = true;
        this.dialogId = this.data[this.current].key;
      }
    },
    handleUpdate() {
      this.data[this.current].key = this.dialogId;
      this.dialogVisible = false;
    },
    movePos(x, y) {
      this.data[this.current].left = x;
      this.data[this.current].top = y;
    }
  },
  directives: {
    drag(el, binding) {
      if (!binding.value.hasEvent) return false;
      el.onmousedown = function(e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        el.style.cursor = "move";
        binding.value.clickHandle();
        document.onmousemove = function(e) {
          e.stopPropagation;
          e.preventDefault;
          let x = e.pageX - disx + "px";
          let y = e.pageY - disy + "px";
          el.style.left = x;
          el.style.top = y;
          binding.value.move(el.style.left, el.style.top);
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
