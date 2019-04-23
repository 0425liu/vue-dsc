<template>
  <div class="label-wrap">
    <label>设备名称</label>
    <el-select v-model="name" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-button
      type="primary"
      icon="el-icon-edit"
      class="btn"
      @click="handleEdit"
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="handleDeleteDsc"
    ></el-button>
    <dcs-output :src="src" :data="data"></dcs-output>
  </div>
</template>

<script>
// @ is an alias to /src
import DcsOutput from "@/components/DcsOutput";
import { getLayout } from "assets/js/mixins";
export default {
  mixins: [getLayout],
  data() {
    return {
      options: [],
      name: "",
      src: "",
      data: []
    };
  },
  components: {
    DcsOutput
  },
  methods: {
    handleChange() {
      const param = {
        name: this.name
      };
      this.$get("api/Page/GetLayout", param).then(res => {
        const results = res.results;
        this.src = results.image;
        this.data = results.data;
      });
    },
    handleEdit() {
      if (this.name) {
        this.$router.push({ path: "addDscInfo", query: { name: this.name } });
      }
    },
    handleDeleteDsc() {
      const params = {
        name: this.name
      };
      this.$post("api/Page/DelLayout", params).then(() => {
        this.$message("删除成功");
        this.options = this.options.filter(item => item !== params.name);
        this.name = "";
        this.data = [];
        this.src = "";
      });
    }
  },
  mounted() {
    this.$get("api/Page/GetName").then(res => {
      this.options = res.results;
    });
    this.updateLayout();
  }
};
</script>
<style lang="scss" scoped>
#DCS {
  margin-top: 20px;
}
.img-wrap {
  margin-top: 10px;
}
.btn {
  margin-left: 10px;
}
</style>
