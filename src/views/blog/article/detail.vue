<template>
  <div class="detail-wrap">
    <div class="edit-title-wrap">
      <span class="black-label" v-if="!acArticle">新增文章</span>
      <span class="black-label" v-else>文章详情</span>
      <div class="button-box" v-if="acArticle">
        <el-button @click="goBack">返回</el-button>
        <el-button @click="doneEdite" v-if="isNoEdit">编辑</el-button>
        <el-button @click="saveArticle('ruleForm')" v-else>保存</el-button>
      </div>
    </div>
    <el-scrollbar class="content-box">
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
            <el-form-item label="文章描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入描述"
                maxlength="150"
                show-word-limit
                v-model="ruleForm.description"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
              <editor
                :catchData="catchData"
                :content="ruleForm.content"
                class="editor"
              ></editor>
            </el-form-item>
          </el-form>
        </div>
        <div class="right-content"></div>
      </div>
    </el-scrollbar>
    <div class="button-box-wrap">
      <el-button @click="cancelEditArticle">取消</el-button>
      <el-button type="primary" @click="saveArticle('dataForm')"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
import editor from "@/components/editor";
export default {
  components: {
    editor,
  },
  data() {
    return {
      ruleForm: {
        title: "",
        description: "",
        content: "",
      },
      rules: {},
      acArticle: null,
      isNoEdit: false,
      configVisible: false,
      isNoEdit: false,
      editorContent: "",
      editor: null,
    };
  },

  mounted() {},

  methods: {
    catchData() {},

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

    saveArticle() {},

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
  },
};
</script>
<style lang="less">
@width: 100vw/1920px;
@height: 100vh/960px;
@height1: 82px * @height;
@width2: 60px * @width;
@height3: 30px * @height;

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
    @heightCalc: 120px * @height;
    height: calc(100% - @heightCalc);

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
      }

      .right-content {
        flex: 1;
        height: 100%;
        border: 1px solid #000;
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
}
</style>