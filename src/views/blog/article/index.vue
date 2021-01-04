<template>
  <div>
    文章管理
  </div>
</template>
<script>

import api from '@/api/blog/article'
export default {
  data() {
    return {
      dataList: [],
    }
  },

  mounted() {
    this.getArticle();
  },

  methods: {
    async getArticle() {
      const res = await this.$http.get(
        api.getArticleList
      )

      console.log(res)
    },
  }
}
</script>
<style lang="less">
  
</style>