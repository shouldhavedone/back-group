<template>
  <div class="label-container">
    <cheader :title="'分类管理'"></cheader>
    <div class="content-wrap">
      <div class="filter-wrap">
        <div class="btn-wrap">
          <el-button type="primary" @click="addLabel"
            >新增分类<i class="el-icon-plus el-icon--right"></i
          ></el-button>
          <el-button type="primary" @click="delLabel"
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
          @btnClick="showDetail"
          @handleSelectionChange="handleSelectionChange"
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

    <el-dialog
      :title="isEdit ? '编辑分类' : '新增分类'"
      :visible.sync="dialogVisible"
    >
      <el-form :model="reqData" label-width="60px">
        <el-form-item v-if="isEdit" label="分类ID">
          <el-input v-model="reqData.id" disabled></el-input>
        </el-form-item>
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
        <el-button @click="cancelSave">取 消</el-button>
        <el-button type="primary" @click="saveLabel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import cheader from "@/components/header";
import ctable from "@/components/table";
import cpagenation from "@/components/pagenation";
import api from "@/api/blog/label";
export default {
  components: {
    ctable,
    cheader,
    cpagenation,
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
        rows: 15,
        isMultiple: true,
        isSaveSelect: true,
        operateBtns: [
          { id: 1, btnName: "编辑" },
          { id: 3, btnName: "删除" },
        ],
      },
      pageparams: {
        pageSize: 15,
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
        createtime: new Date(),
      },
      isEdit: false,
      selectLabel: [],
    };
  },

  mounted() {
    this.getLabelList();
  },

  methods: {
    handlePage(v) {
      this.pageparams.page = v;
      this.tableSettings.page = v;
      this.getLabelList();
    },

    handleSelectionChange(val) {
      this.selectLabel = val.map((c) => c.id);
      console.log(this.selectLabel);
    },

    showDetail(obj) {
      if (obj.id == 1) {
        this.resetDialog();
        this.isEdit = true;
        this.dialogVisible = true;
        this.reqData = obj.row;
      } else {
        this.selectLabel = [obj.row.id];
        this.delLabel();
      }
    },

    cancelSave() {
      this.dialogVisible = false;
      this.isEdit = false;
      this.getLabelList();
      this.resetDialog();
    },

    addLabel() {
      this.isEdit = false;
      this.resetDialog();
      this.dialogVisible = true;
    },

    resetDialog() {
      this.reqData = {
        id: "",
        name: "",
        description: "",
      };
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
      if (res && res.isSucceed) {
        res.data.forEach((c) => {
          c.createtime = this.$moment(new Date(c.createtime)).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        this.loading = false;
        this.dataList = res.data;
        this.pageparams.total = res.total;
      }
    },

    async saveLabel() {
      const res = await this.$http.post(api.addOrUpdateLabel, this.reqData);
      if (res && res.isSucceed) {
        this.$message.success(res.message);
        this.getLabelList();
      }
      this.dialogVisible = false;
      this.resetDialog();
    },

    async delLabel() {
      const params = {
        ids: this.selectLabel.join(","),
      };
      const res = await this.$http.post(api.delLabel, params);
      if (res && res.isSucceed) {
        this.$message.success(res.message);
        this.selectLabel = [];
        this.$nextTick(() => {
          this.getLabelList();
        })
      }
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
    position: relative;

    .filter-wrap {
      display: flex;
      justify-content: space-between;
      margin: 10px * @height 0 16px * @height;

      .search-wrap {
        width: 360px * @width;
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

  .el-dialog {
    width: 700px * @width;
  }
}
</style>