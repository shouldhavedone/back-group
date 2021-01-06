<template>
  <div class="vue-simplemde">
    <textarea
      :id="id"
      class="vue-simplemde-textarea"
      :name="name"
      :value="value"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>

<script>
import SimpleMDE from "simplemde";
import marked from "marked";
export default {
  data() {
    return {
      isValueUpdateFromInner: false,
    };
  },
  props: {
    id: String,
    value: String,
    name: String,
    previewClass: String,
    autoinit: {
      type: Boolean,
      default() {
        return true;
      },
    },
    highlight: {
      type: Boolean,
      default() {
        return false;
      },
    },
    sanitize: {
      type: Boolean,
      default() {
        return false;
      },
    },
    configs: {
      type: Object,
      default() {
        return {};
      },
    },
    previewRender: {
      type: Function,
    },
  },
  mounted() {
    if (this.autoinit) this.initialize();
  },
  deactivated() {
    const editor = this.simplemde;
    if (!editor) return;
    const isFullScreen = editor.codemirror.getOption("fullScreen");
    if (isFullScreen) editor.toggleFullScreen();
  },
  methods: {
    initialize() {
      const configs = Object.assign(
        {
          element: this.$el.firstElementChild,
          initialValue: this.value,
          previewRender: this.previewRender,
          autoDownloadFontAwesome: false,
          renderingConfig: {},
          autosave: {
            enabled: true,
            uniqueId: "MyUniqueID",
            delay: 2 * 60 * 1000,
          },
          insertTexts: {
            horizontalRule: ["", "\n\n-----\n\n"],
            image: ["![](http://", ")"],
            link: ["[", "](http://)"],
            table: [
              "",
              "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n",
            ],
          },
          hideIcons: ["guide"],
          showIcons: [
            "bold",
            "italic",
            "strikethrough",
            "heading",
            "heading-smaller	",
            "heading-bigger	",
            "heading-1",
            "heading-2",
            "heading-3",
            "code",
            "quote	",
            "unordered-list	",
            "ordered-list",
            "clean-block",
            "link",
            "image",
            "table",
            "horizontal-rule	",
            "preview",
            "side-by-side",
            "fullscreen",
          ],
        },
        this.configs
      );
      if (configs.initialValue) {
        this.$emit("input", configs.initialValue);
      }
      if (this.highlight) {
        configs.renderingConfig.codeSyntaxHighlighting = false;
      }
      marked.setOptions({ sanitize: this.sanitize });
      this.simplemde = new SimpleMDE(configs);
      const className = this.previewClass || "markdown-body";
      this.addPreviewClass(className);
      this.bindingEvents();
      this.$nextTick(() => {
        this.$emit("initialized", this.simplemde);
      });
    },
    bindingEvents() {
      this.simplemde.codemirror.on("change", (instance, changeObj) => {
        if (changeObj.origin === "setValue") {
          return;
        }
        const val = this.simplemde.value();
        this.handleInput(val);
      });
      this.simplemde.codemirror.on("blur", () => {
        const val = this.simplemde.value();
        this.handleBlur(val);
      });
    },
    addPreviewClass(className) {
      const wrapper = this.simplemde.codemirror.getWrapperElement();
      const preview = document.createElement("div");
      wrapper.nextSibling.className += ` ${className}`;
      preview.className = `editor-preview ${className}`;
      wrapper.appendChild(preview);
    },
    handleInput(val) {
      this.isValueUpdateFromInner = true;
      this.$emit("input", val);
    },
    handleBlur(val) {
      this.isValueUpdateFromInner = true;
      this.$emit("blur", val);
    },
  },
  destroyed() {
    this.simplemde = null;
  },
  watch: {
    value(val) {
      if (this.isValueUpdateFromInner) {
        this.isValueUpdateFromInner = false;
      } else {
        this.simplemde.value(val);
      }
    },
  },
};
</script>

<style>
.vue-simplemde .markdown-body {
  padding: 0.5em;
  font-family: Microsoft Yahei;
}
.vue-simplemde .editor-preview-active,
.vue-simplemde .editor-preview-active-side {
  display: block;
}
.vue-simplemde .CodeMirror {
  min-height: 300px;
  line-height: 24px;
}
.vue-simplemde .CodeMirror-scroll {
  min-height: 300px;
  height: 540px;
}
.vue-simplemde .CodeMirror-code {
  padding-bottom: 40px;
}
.vue-simplemde .CodeMirror .CodeMirror-code .cm-link {
  color: #1890ff;
}
.vue-simplemde .CodeMirror .CodeMirror-code .cm-string.cm-url {
  color: #2d3b4d;
}
.vue-simplemde .CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
  padding: 0 2px;
  color: #e61e1e;
}
.vue-simplemde .editor-toolbar.fullscreen,
.vue-simplemde .CodeMirror-fullscreen {
  z-index: 1000;
}
.vue-simplemde .CodeMirror-fullscreen .CodeMirror-scroll {
  height: 100%;
}
</style>