<template>
  <div class="article-container">
    <cheader :title="'文章管理'"></cheader>
    <div class="content-wrap">
      <ctable
        :data="dataList"
        :cloumn="cloumn"
        :settings="tableSettings"
        v-loading="loading"
        element-loading-text="Loading"
        element-loading-spinner="el-icon-loading"
      ></ctable>
    </div>
  </div>
</template>
<script>
import ctable from "@/components/table";
import cheader from "@/components/header";
import api from "@/api/blog/article";
export default {
  components: {
    ctable,
    cheader,
  },
  data() {
    return {
      dataList: [],
      cloumn: [
        {
          prop: "id",
          label: "ID",
          minWidth: 100,
        },
        {
          prop: "title",
          label: "文章标题",
          minWidth: 141,
        },
        {
          prop: "description",
          label: "简介",
          minWidth: 150,
        },
        {
          prop: "label",
          label: "分类",
          minWidth: 100,
        },
        {
          prop: "watched",
          label: "查看量",
          minWidth: 60,
        },
        {
          prop: "thumbs_up",
          label: "点赞量",
          minWidth: 60,
        },
        {
          prop: "top",
          label: "顶置",
          minWidth: 60,
        },
        {
          prop: "createtime",
          label: "发布时间",
          minWidth: 150,
        },
      ],
      tableSettings: {
        page: 1,
        rows: 12,
        isMultiple: true,
        isSaveSelect: true,
        operateBtns: [{ id: 2, btnName: "详情" }],
      },
      loading: false,
    };
  },

  mounted() {
    this.getArticle();
  },

  methods: {
    async getArticle() {
      const res = await this.$http.get(api.getArticleList);

      console.log(res);
    },
  },
};
</script>
<style lang="less">
@width: 100vw/1920px;
@height: 100vh/960px;

.article-container {
  height: 100%;
  width: 100%;
}
</style>