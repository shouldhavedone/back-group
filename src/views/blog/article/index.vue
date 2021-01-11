<template>
  <div class="article-container">
    <cheader :title="'文章管理'" v-if="!showDetail"></cheader>
    <div class="content-wrap" v-if="!showDetail">
      <div class="filter-wrap">
        <div class="search-wrap">
          <div>
            <span>文章分类：</span>
            <el-select
              v-model="labelId"
              @change="getArticleList"
              clearable
              placeholder="全部"
            >
              <el-option
                v-for="item in labelData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-input
              placeholder="请输入标题"
              v-model="searchTitle"
              class="input-with-select"
              @change="getArticleList"
              clearable
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="btn-wrap">
          <el-button type="primary" @click="addArticle"
            >新增分类<i class="el-icon-plus el-icon--right"></i
          ></el-button>
          <el-button type="primary"
            >批量删除<i class="el-icon-delete-solid el-icon--right"></i
          ></el-button>
        </div>
      </div>
      <div class="table-wrap">
        <ctable
          :data="dataList"
          :cloumn="cloumn"
          :settings="tableSettings"
          v-loading="loading"
          element-loading-text="Loading"
          element-loading-spinner="el-icon-loading"
        ></ctable>
      </div>
      <div class="pageparams-wrap">
        <cpagenation
          :pageparams="pageparams"
          @handlePage="handlePage"
        ></cpagenation>
      </div>
    </div>
    <cdetail v-if="showDetail" ref="detail"></cdetail>
  </div>
</template>
<script>
import ctable from "@/components/table";
import cpagenation from "@/components/pagenation";
import cheader from "@/components/header";
import cdetail from "./detail";
import api from "@/api/blog/article";
export default {
  components: {
    ctable,
    cheader,
    cdetail,
    cpagenation,
  },
  data() {
    return {
      dataList: [],
      labelData: [],
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
          prop: "labelName",
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
        {
          prop: "modifytime",
          label: "修改时间",
          minWidth: 150,
        },
      ],
      tableSettings: {
        page: 1,
        rows: 12,
        isMultiple: true,
        isSaveSelect: true,
        operateBtns: [
          { id: 2, btnName: "详情" },
          { id: 3, btnName: "删除" },
        ],
      },
      pageparams: {
        pageSize: 10,
        total: 0,
        page: 1,
      },
      loading: false,
      searchTitle: "",
      labelId: "",
      showDetail: false,
    };
  },

  mounted() {
    this.getLabelList();
    this.getArticleList();
  },

  methods: {
    addArticle() {
      this.showDetail = true;
    },

    handlePage(v) {
      this.pageparams.page = v;
      this.tableSettings.page = v;
      this.getArticleList();
    },

    async getLabelList() {
      const res = await this.$http.get(api.getAllLabel);
      if (res && res.isSucceed) {
        this.labelData = res.data;
      }
    },

    async getArticleList() {
      this.loading = true;
      const params = {
        page: this.pageparams.page,
        rows: this.pageparams.pageSize,
        title: this.searchTitle,
        label_id: this.labelId,
      };
      const res = await this.$http.get(
        `${api.getArticleList}?${this.$qs.stringify(params)}`
      );
      this.loading = false;
      if (res && res.isSucceed) {
        console.log(res.data)
        res.data.forEach(item => item.labelName = item.Label.name)
        this.dataList = res.data;
      }
    },
  },
};
</script>
<style lang="less">
@width: 100vw/1920px;
@height: 100vh/960px;
@height1: 50px * @height;

.article-container {
  height: 100%;
  width: 100%;

  .content-wrap {
    height: calc(100% - @height1);
    width: 100%;
    position: relative;

    .filter-wrap {
      display: flex;
      justify-content: space-between;
      margin: 10px * @height 0 16px * @height;

      .search-wrap {
        width: 700px * @width;
        display: flex;
        & > div {
          flex: 1;
        }
        & > div:not(:last-child) {
          margin-right: 16px * @width;
        }
      }
    }

    .pageparams-wrap {
      width: 100%;
      height: 50px * @height;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>