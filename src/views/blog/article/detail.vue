<template>
  <div class="detail-wrap">
    <div class="edit-title-wrap">
      <span class="black-label" v-if="!acArticle">新增文章</span>
      <span class="black-label" v-else>文章详情</span>
      <div class="button-box" v-if="acArticle">
        <el-button @click="goBack">返回</el-button>
        <el-button @click="doneEdite" v-if="isNoEdit == true">编辑</el-button>
        <el-button @click="savePush('ruleForm')" v-else>保存</el-button>
      </div>
    </div>

    <el-scrollbar class="contain-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      </el-form>
    </el-scrollbar>
    <div class="button-box-wrap">
      <el-button @click="cancelEditArticle">取消</el-button>
      <el-button type="primary" @click="saveOnlineTemplate('dataForm')"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {},
      acArticle: null,
      isNoEdit: false,
      configVisible: false,
      isNoEdit: false,
    };
  },
  methods: {
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

    saveOnlineArticle() {

    },
    
    cancelEditArticle() {
      this.$confirm("确定放弃编辑文章,返回?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        this.configVisible = false;
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
  height: calc(100% - @height3);
  width: calc(100% - @width2);
  margin: @height3 30px * @width 0;
  background: #fff;
  border-radius: 8px * @width;
  position: relative;
  .edit-title-wrap {
    height: 64px * @height;
    border-bottom: 1px solid #eee;
    padding-left: 30px * @width;
    position: relative;
    margin-bottom: 16px * @height;
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
    line-height: 64px * @height;
  }

  .contain-box {
    @heightCalc: 164px * @height;
    height: calc(100% - @heightCalc);
  }
  /deep/ .el-form .el-form-item__label {
    width: 86px * @width;
    color: #000000;
    font-size: 16px * @width;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  /deep/ .el-form {
    & > :nth-child(1),
    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4) {
      height: 40px * @height;

      .el-form-item__content {
        width: 480px * @width;
      }
    }

    & > :nth-child(5),
    & > :nth-child(6),
    & > :nth-child(7) {
      width: 1125px * @width;
    }
    .el-select {
      width: 100%;
    }
  }

  /deep/ .el-checkbox-group {
    display: flex;
    justify-content: space-around;

    .el-checkbox {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
    }
  }
  .el-radio {
    position: relative;
    width: 100px;

    .radio-text {
      padding-left: 24px;
    }
  }
  /deep/.el-radio .el-radio__label {
    left: 0;
    position: absolute !important;
    z-index: 2;
    padding-left: 0;
    display: inline-block;
  }
  .button-box-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    height: 80px * @height;
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