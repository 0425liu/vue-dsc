<template>
  <div>
    <div class="label-wrap">
      <label>设备名称</label>
      <el-input
        v-model="name"
        placeholder="请输设备名字"
        class="input"
      ></el-input>

      <el-upload
        class="file"
        ref="upload"
        action="AddImage"
        :http-request="httpRequest"
        :limit="limit"
        :on-exceed="handleExceed"
      >
        <span>点击上传</span>
      </el-upload>
      <el-button v-if="show" type="success" @click="handleSave" class="save-btn"
        >保存</el-button
      >
    </div>
    <div v-show="show">
      <div class="label-wrap">
        <label>文字标注</label>
        <el-input
          v-model="id"
          placeholder="文字测点ID"
          class="input"
        ></el-input>
        <el-input class="input" v-model="value" placeholder="初始值"></el-input>
        <el-input v-model="unit" placeholder="单位" class="input"></el-input>
        <span class="add" @click="addTextMark">添加</span>
      </div>
      <div class="label-wrap">
        <label>图形标注</label>
        <el-input
          v-model="key"
          placeholder="图标测点ID"
          class="input"
        ></el-input>
        <span class="add" @click="addIconMark">添加</span>
      </div>
      <el-radio-group v-model="icon" class="radio-group">
        <el-radio v-for="(item, index) in icons" :key="index" :label="item">
          <span v-html="item"></span>
        </el-radio>
      </el-radio-group>
      <dcs-output
        :src="src"
        :data="data"
        :current="current"
        @handleClick="handleClick"
        @handleDelete="handleDelete"
        :hasEvent="true"
      ></dcs-output>
    </div>
  </div>
</template>

<script>
import DcsOutput from "@/components/DcsOutput";
import { getLayout } from "assets/js/mixins";
export default {
  mixins: [getLayout],
  data() {
    return {
      current: 0,
      limit: 1,
      data: [],
      show: false,
      src: "",
      icons: [
        "<div class='icon-water'></div>",
        "<i class='iconfont'>&#xe615;<i>",
        "<i class='iconfont'>&#xe614;</i>",
        "<i class='iconfont'>&#xe613;</i>",
        "<i class='iconfont'>&#xe612;</i>",
        "<i class='iconfont'>&#xe611;</i>",
        "<i class='iconfont'>&#xe616;</i>",
        "<i class='iconfont'>&#xe617;</i>",
        "<i class='iconfont'>&#xe61f;</i>",
        "<i class='iconfont'>&#xe620;</i>",
        "<i class='iconfont'>&#xe621;</i>",
        "<i class='iconfont'>&#xe61d;</i>",
        "<i class='iconfont'>&#xe631;</i>",
        "<i class='iconfont'>&#xe633;</i>",
        "<i class='iconfont'>&#xe62e;</i>",
        "<i class='iconfont'>&#xe62d;</i>",
        "<i class='iconfont'>&#xe62f;</i>",
        "<i class='iconfont'>&#xe630;</i>",
        "<i class='iconfont'>&#xe622;</i>",
        "<i class='iconfont'>&#xe636;</i>"
      ],
      name: "",
      id: "",
      value: "",
      unit: "",
      key: "",
      icon: ""
    };
  },
  components: {
    DcsOutput
  },
  methods: {
    httpRequest(options) {
      const file = options.file;
      if (file) {
        this.fileReader.readAsDataURL(file);
      }
      this.fileReader.onload = () => {
        let base64Str = this.fileReader.result;
        this.src = base64Str;
        this.show = true;
      };
    },
    handleExceed() {
      this.$message.warning("请先删除再更换图片");
    },
    addTextMark() {
      let { id, value, unit } = this;
      if (id === "" || value === "" || unit === "") {
        this.$message.error("请填写文字测点ID、初始值、单位");
        return;
      }
      const textObj = {
        left: "50%",
        top: "50%",
        key: this.id,
        class: "mark-value",
        html: `${this.value}<span>${this.unit}</span>`
      };
      this.data.push(textObj);
      this.clearTextInput();
      this.getCurrent(this.data.length - 1);
    },
    addIconMark() {
      let { key, icon } = this;
      if (key === "" || icon === "") {
        this.$message.error("请填写图标测点ID、选择图形");
        return;
      }
      const iconObj = {
        left: "50%",
        top: "50%",
        key: this.key,
        class: "ico-wrap",
        html: this.icon
      };
      this.data.push(iconObj);
      this.key = "";
      this.getCurrent(this.data.length - 1);
    },
    clearTextInput() {
      this.id = "";
      this.unit = "";
      this.value = "";
    },
    handleSave() {
      if (this.name === "") {
        this.$message.error("请填写设备名字");
        return false;
      }
      const param = {
        data: JSON.stringify(this.data),
        name: this.name,
        image: this.src
      };
      this.$post("api/Page/SaveLayout", param).then(() => {
        this.$router.push({ path: "/", query: { name: this.name } });
      });
    },
    handleDelete() {
      this.data.splice(this.current, 1);
    },
    handleClick(index) {
      this.getCurrent(index);
    },
    getCurrent(index) {
      this.current = index;
    },
    reset() {
      this.id = "";
      this.unit = "";
      this.value = "";
      this.show = false;
      this.data = [];
      this.current = 0;
      this.src = "";
      this.name = "";
      this.key = "";
      this.icon = "";
    },
    setData() {
      this.show = true;
    }
  },
  watch: {
    $route() {
      this.reset();
    }
  },
  mounted() {
    if (!window.FileReader) {
      console.error("Your browser does not support FileReader API!");
    }
    this.fileReader = new FileReader();
    this.updateLayout(this.setData);
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}

.el-radio {
  width: 100px;
  margin-right: 0;
  font-size: 30px;
  /deep/.el-radio__label {
    display: inline-block;
    vertical-align: middle;
  }
}
.input {
  display: inline-block;
  width: 280px;
  margin-right: 15px;
}
.file {
  display: inline-block;
  /deep/.el-upload-list {
    display: inline-block;
  }
  /deep/.el-upload-list__item {
    line-height: normal;
    &:first-child {
      margin-top: 0;
      margin-left: 15px;
    }
  }

  span {
    color: #46b1fe;
    text-decoration: underline;
  }
}
.add {
  display: inline-block;
  color: #46b1fe;
  text-decoration: underline;
  cursor: pointer;
}
.label-wrap {
  padding-bottom: 15px;
}
.save-btn {
  margin-left: 15px;
  display: inline-block;
}
.radio-group {
  padding-bottom: 15px;
  margin-left: 80px;
}
</style>
