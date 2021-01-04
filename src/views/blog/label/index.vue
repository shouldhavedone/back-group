<template>
  <div class="label-container">
    <cheader :title="'分类管理'"></cheader>
    <div class="content-wrap">
      <div class="filter-wrap">
        <div class="btn-wrap">
          <el-button type="primary" @click="dialogVisible = true"
            >新增分类<i class="el-icon-plus el-icon--right"></i
          ></el-button>
          <el-button type="primary"
            >批量删除<i class="el-icon-delete-solid el-icon--right"></i
          ></el-button>
        </div>
        <div class="search-wrap">
          <el-input
            placeholder="请输入标签名"
            v-model="searchName"
            class="input-with-select"
            @change="getLabelList"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
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
    </div>

    <el-dialog title="新增分类" :visible.sync="dialogVisible">
      <el-form :model="reqData" label-width="60px">
        <el-form-item label="分类名">
          <el-input
            v-model="reqData.name"
            placeholder="请输入分类名"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入描述"
            maxlength="150"
            show-word-limit
            v-model="reqData.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLabel"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import cheader from "@/components/header";
import ctable from "@/components/table";
import api from "@/api/blog/label";

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
          prop: "name",
          label: "标签名",
          minWidth: 120,
        },
        {
          prop: "description",
          label: "描述",
          minWidth: 150,
        },
        {
          prop: "number",
          label: "文章数量",
          minWidth: 100,
        },
        {
          prop: "createtime",
          label: "创建时间",
          minWidth: 150,
        },
      ],
      tableSettings: {
        page: 1,
        rows: 12,
        isMultiple: true,
        isSaveSelect: true,
        operateBtns: [
          { id: 1, btnName: "编辑" },
          { id: 3, btnName: "删除" },
        ],
      },
      pageparams: {
        pageSize: 10,
        total: 0,
        page: 1,
      },
      searchName: "",
      loading: false,
      dialogVisible: false,
      reqData: {
        id: "",
        name: "",
        description: "",
      },
    };
  },

  mounted() {
    this.getLabelList();
  },

  methods: {

    resetDialog() {
      this.reqData = {
        id: "",
        name: "",
        description: "",
      }
    },
    async getLabelList() {
      const params = {
        page: this.pageparams.page,
        rows: this.pageparams.pageSize,
        name: this.searchName,
      };
      this.loading = true;
      const res = await this.$http.get(
        `${api.getLabelList}?${this.$qs.stringify(params)}`
      );
      this.loading = false;
      if (res && res.isSucceed) {
        this.dataList = res.data;
        this.pageparams.total = res.total;
      }
    },

    async saveLabel() {
      if(this.reqData.id) {

      } else {
        const res = await this.$http.post(
          api.addOrUpdateLabel,
          this.reqData,
        )
        console.log(res)
        if(res && res.isSucceed) {
          this.dialogVisible = false;
          this.getLabelList();
        }
      }
      this.dialogVisible = false;
      this.resetDialog();
    },
  },
};
</script>
<style lang="less">
@width: 100vw/1920px;
@height: 100vh/960px;
@height1: 50px * @height;

.label-container {
  height: 100%;
  width: 100%;

  .content-wrap {
    height: calc(100% - @height1);
    width: 100%;

    .filter-wrap {
      display: flex;
      justify-content: space-between;
      margin: 10px * @height 0 16px * @height;

      .search-wrap {
        width: 360px * @width;
      }
    }
  }

  .el-dialog {
    width: 700px * @width;
  }
}
</style>