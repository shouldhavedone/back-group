<template>
  <div class="detail-wrap">
    <div class="edit-title-wrap">
      <span class="black-label" v-if="!acArticle">新增文章</span>
      <span class="black-label" v-else>文章详情</span>
      <el-button @click="saveArticle">保存</el-button>
      <div class="button-box" v-if="acArticle">
        <el-button @click="goBack">返回</el-button>
        <el-button @click="doneEdite" v-if="isNoEdit">编辑</el-button>
        <el-button @click="saveArticle" v-else>保存</el-button>
      </div>
    </div>
    <div class="content-box">
      <div class="content-wrap">
        <div class="left-content">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="标题名称" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3 }"
                placeholder="请输入描述"
                maxlength="150"
                show-word-limit
                v-model="ruleForm.description"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
              <editor
                v-model="ruleForm.content"
                id="contentEditor"
                class="editor"
                ref="markdownEditor"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="right-content">
          <div class="label-wrap">
            <div>分类</div>
            <el-radio-group v-model="ruleForm.labelID" size="small">
              <el-radio-button v-for="(item, index) in labelData" :key="index" :label="item.id">{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import editor from "@/components/editor";
import api from "@/api/blog/article";

export default {
  components: { editor },
  data() {
    return {
      ruleForm: {
        title: "",
        description: "",
        content: "",
        labelID: "",
        image: "",
        top: 0,
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          { min: 3, message: "多编几个字吧", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "change" },
        ],
      },
      acArticle: null,
      isNoEdit: false,
      configVisible: false,
      isNoEdit: false,
      editorContent: "",
      editor: null,
      labelData: [],
    };
  },

  mounted() {
    this.resetData();
    this.getLabelList();
  },

  methods: {
    resetData() {
      this.ruleForm = {
        title: "",
        description: "",
        content: "",
      };
    },

    goBack() {
      if (!this.isNoEdit && this.ruleForm.id) {
        this.$confirm("确定放弃编辑文章,返回首页", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(async () => {
            this.cancelAdd();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.cancelAdd();
      }
    },

    saveArticle() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$confirm("确认发布文章？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }).then(async () => {
            console.log(this.ruleForm);
          });
        }
      });
    },

    cancelEditArticle() {
      this.$confirm("确定放弃编辑文章,返回?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        this.configVisible = false;
        this.$parent.showDetail = false;
      });
    },

    cancelAdd() {
      this.isNoEdit = false;
      this.$parent.showDetail = false;
    },

    async getLabelList() {
      const res = await this.$http.get(api.getAllLabel);
      if (res && res.isSucceed) {
        this.labelData = res.data;
      }
    },
  },

  computed: {
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfo"));
    },
  },
};
</script>

<style lang="less" scoped>
  

  .el-radio-group  {
    .el-radio-button {

    }
  }
</style>



<style lang="less">
@width: 100vw/1920px;
@height: 100vh/960px;
@height1: 60px * @height;

.detail-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  .edit-title-wrap {
    height: 50px * @height;
    position: relative;
    margin-bottom: 10px * @height;
  }
  .button-box {
    position: absolute;
    right: 30px * @width;
    top: 50%;
    transform: translateY(-50%);
    button {
      padding: 12px * @height 30px * @width;
    }
  }
  .black-label {
    font-size: 20px * @width;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 50px * @height;
  }

  .content-box {
    height: calc(100% - @height1);

    .content-wrap {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .left-content {
        flex: 4;
        height: 100%;
        margin-right: 16px * @width;
        border: 1px solid #ccc;
        padding: 20px * @height 24px * @width 0 0;
        border-radius: 6px * @width;
      }

      .right-content {
        flex: 1;
        height: 100%;
        border-radius: 6px * @width;
        border: 1px solid #ccc;
      }
    }
  }

  .button-box-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    height: 60px * @height;
    left: 0;
    .el-button {
      width: 120px * @width;
      height: 40px * @height;
    }
    & > :nth-child(1) {
      margin-right: 40px * @width;
    }
  }

  .editor {
    height: 610px * @height;
  }
}
</style>