<template>
  <div id="editor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editorElem",
  props: ["catchData", "content"],
  data() {
    return {
      editor: null,
      editorContent: "",
    };
  },
  watch: {
    content() {
      this.editor.txt.html(this.content);
    },
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    console.log(this.editor)
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      this.catchData(this.editorContent);
    };
    this.editor.config.uploadImgServer = "你的上传图片的接口";
    this.editor.config.uploadFileName = "你自定义的文件名";
    this.editor.config.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];

    this.editor.config.uploadImgHooks = {
      before: function (xhr, editor, files) {},
      success: function (xhr, editor, result) {
        this.imgUrl = Object.values(result.data).toString();
      },
      fail: function (xhr, editor, result) {},
      error: function (xhr, editor) {},
      timeout: function (xhr, editor) {},

      customInsert: function (insertImg, result, editor) {
        let url = Object.values(result.data); // result.data就是服务器返回的图片名字和链接
        JSON.stringify(url); // 在这里转成JSON格式
        insertImg(url);
      },
    };

    this.editor.create(); // 创建富文本实例
    if (!this.content) {
      this.editor.txt.html("请编辑内容1");
    }
  },
};
</script>

<style lang='less'>
</style>