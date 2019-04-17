export const getLayout = {
  methods: {
    updateLayout(callback) {
      let name = this.$route.query.name;
      if (name) {
        this.$get("api/Page/GetLayout", { name: name }).then(res => {
          const results = res.results;
          this.src = results.image;
          this.data = results.data;
          this.name = name;
          callback && callback();
        });
      }
    }
  }
};
