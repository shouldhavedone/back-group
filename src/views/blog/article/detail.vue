<template>
  <div class="detail-wrap">
    <div class="edit-title-wrap">
      <span class="black-label" v-if="!acArticle">新增文章</span>
      <span class="black-label" v-else>文章详情</span>
      <div class="button-box" v-if="!acArticle">
        <el-button @click="goBack">取消</el-button>
        <el-button @click="saveArticle">存为草稿</el-button>
        <el-button @click="saveArticle">文章发布</el-button>
      </div>
      <div class="button-box" v-else>
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
          <el-scrollbar style="height: 100%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="label_id">
                <div class="label-wrap">
                  <div class="text-label">文章分类</div>
                  <el-radio-group v-model="ruleForm.label_id" size="small">
                    <el-radio-button
                      v-for="(item, index) in labelData"
                      :key="index"
                      :label="item.id"
                      >{{ item.name }}</el-radio-button
                    >
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item prop="top">
                <div class="top-wrap">
                  <el-radio-group v-model="ruleForm.top">
                    <el-radio label="1" border>文章顶置</el-radio>
                    <el-radio label="0" border>不顶置</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item prop="createtime">
                <div class="time-wrap">
                  <div class="text-label">发表时间：</div>
                  <el-date-picker
                    v-model="ruleForm.createtime"
                    type="datetime"
                    placeholder="选择发布时间"
                    align="right"
                    :picker-options="pickerOptions"
                    class="time-box"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item prop="keyword">
                <div class="keyword-wrap">
                  <div class="text-label">关键字：</div>
                  <el-input
                    v-model="ruleForm.keyword"
                    placeholder="请输入关键字"
                    clearable
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="image">
                <div class="image-wrap">
                  <div class="text-label">文章缩略图</div>
                  <el-upload
                    :action="uploadUrl()"
                    :data="qiniuData"
                    list-type="picture-card"
                    :file-list="imageList"
                    :auto-upload="true"
                    :on-change="uploadPictureChange"
                    :on-success="uploadPictureSuccess"
                    :class="uploadDisabled ? 'upload' : ''"
                    :limit="1"
                    class="upload-box"
                    :before-upload="beforeUpload"
                  >
                    <div slot="default" class="upload-bg">
                      <i class="el-icon-plus"></i>
                    </div>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>

                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </div>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import editor from "@/components/editor";
import api from "@/api/blog/article";
import baseUrl from "@/api/baseUrl.js";

export default {
  components: { editor },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        description: "",
        content: "",
        label_id: "",
        keyword: "",
        image: "",
        createtime: "",
        top: "0",
        status: 1,
      },
      imageList: [],
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          { min: 3, message: "多编几个字吧", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "change" },
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "change" },
        ],
      },
      acArticle: null,
      isNoEdit: false,
      configVisible: false,
      isNoEdit: false,
      editorContent: "",
      editor: null,
      labelData: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      uploadDisabled: false,
      qiniuData: {
        key: "",
        token: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  watch: {
    imageList: function (newVal, oldVal) {
      this.uploadDisabled = newVal.length > 0 ? true : false;
    },
  },
  mounted() {
    this.resetData();
    this.getLabelList();
  },

  methods: {
    uploadUrl() {
      return baseUrl + api.uploadImg;
    },

    async beforeUpload() {
      const res = await this.$http.get(api.getQiniuToken);
      if (res && res.isSucceed) {
        this.qiniuData.token = res.data;
      }
    },

    checkData() {
    },

    uploadPictureChange(file, fileList) {
      this.qiniuData.key = file.name;
      this.imageList = fileList;
    },

    uploadPictureSuccess(file, fileList) {
      if (file.isSucceed) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.imageList = [];
        this.ruleForm.image = file.data;
      }
    },

    async handleRemove(file) {
      const params = {
        filename: file.name,
      };
      const res = await this.$http.post(api.delImg, params);
      if (res && res.isSucceed) {
        this.imageList = [];
        this.ruleForm.image = "";
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleDownload(file) {
      console.log(file);
    },

    resetData() {
      this.ruleForm = {
        id: "",
        user_id: "",
        title: "",
        description: "",
        content: "",
        label_id: "",
        keyword: "",
        image: "",
        createtime: "",
        top: "0",
        status: 1,
      };
      this.imageList = [];
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
      this.checkData();
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$confirm("确认发布文章？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }).then(async () => {
            this.ruleForm.content = JSON.stringify(this.$refs.markdownEditor.simplemde.markdown(this.ruleForm.content))
            this.ruleForm.user_id = this.userInfo.id;
            const res = await this.$http.post(api.saveArticle, this.ruleForm);
            console.log(res)
            if(res && res.isSucceed) {
              this.$message.success(res.message);
              this.resetData();
              this.cancelAdd();
            }
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

        .el-form-item__label {
          font-weight: 700;
          font-size: 14px * @width;
        }
      }

      .right-content {
        flex: 1;
        height: 100%;
        border-radius: 6px * @width;
        border: 1px solid #ccc;
        padding: 20px * @height 12px * @width;

        .label-wrap {
          padding-bottom: 8px * @height;
          border-bottom: 1px solid #dcdfe6;
          .el-radio-group {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }

          .el-radio-button:first-child .el-radio-button__inner {
            border-left: none;
            border-radius: 0;
          }

          .el-radio-button:last-child .el-radio-button__inner {
            border-radius: 0;
          }

          .el-radio-button__inner {
            border: none;
          }

          .el-radio-button {
            margin: 6px * @height 6px * @width;
            border: 1px solid #dcdfe6;
            background: #aaa;
          }
        }

        .top-wrap {
          height: 60px * @height;
          padding: 10px * @height 0;
          border-bottom: 1px solid #dcdfe6;

          .el-radio-group {
            display: flex;
            justify-content: space-around;

            .el-radio {
              margin-right: 0;
            }

            .el-radio__label {
              font-weight: 700;
            }
          }
        }

        .time-wrap,
        .keyword-wrap {
          margin-top: 10px * @height;
          border-bottom: 1px solid #dcdfe6;
          display: flex;
          align-items: center;

          & > div:first-child {
            width: 86px * @width;
            margin-bottom: 0;
          }

          .el-input__inner {
            border: none;
            padding: 0;
          }
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          margin-left: -10px * @width;
        }

        .time-box .el-input__inner {
          border: none;
          padding-left: 32px * @width;
        }

        .image-wrap {
          margin-top: 16px * @height;

          .upload-bg {
            height: 148px * @height;
            width: 100%;
            background-image: url("../../../assets/images/upload-bg.jpg");
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .upload-box {
            text-align: center;
            .el-upload--picture-card {
              height: 100%;
              width: 100%;
            }
          }

          .upload {
            width: 100%;
            .el-upload--picture-card {
              display: none !important;
            }
          }

          .el-upload-list--picture-card {
            display: inline-block;
            width: 100%;
            // height: 170px * @height;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ccc;

            .el-upload-list__item {
              border: none;
              margin: 0;
              height: 148px * @height;
            }
          }
        }

        .text-label {
          text-align: center;
          font-size: 16px * @width;
          font-weight: 700;
        }

        .el-form-item {
          margin-bottom: 0;
        }
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
