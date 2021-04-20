<template>
  <div>
    <div v-if="!repoUr1">loding</div>
    <div v-else>
      moster star repo is
      <a :href="repoUr1">{{repoName}}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repoUr1: "",
      repoName: "",
    };
  },
  mounted() {
    // 发ajax请求获取数据
    const url = `https://api.github.com/search/users?q=vue&sort=star`;
    // this.$http.get(url).then(
    //   (response) => {
    //     // 成功了
    //     debugger;
    //     const result = response.data;
    //     // 得到最受欢迎的repo
    //     const mostRepo = result.items[0];
    //     console.log(mostRepo);
    //     this.repoUr1 = mostRepo.html_url;
    //     this.repoName = mostRepo.login;
    //   },
    //   (faile) => {
    //     console.log(faile);
    //     alert("请求失败");
    //   }
    // );
    this.$axios
      .get(url)
      .then((response) => {
        // 成功了
        debugger;
        const result = response.data;
        // 得到最受欢迎的repo
        const mostRepo = result.items[0];
        console.log(mostRepo);
        this.repoUr1 = mostRepo.html_url;
        this.repoName = mostRepo.login;
      })
      .catch((error) => {
        console.log(error);
        alert("请求失败");
      });
  },
};
</script>

<style scoped lang="less">
</style>