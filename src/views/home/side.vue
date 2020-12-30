<template>
  <div class="menu-content">
    <div v-for="(item, index) in navMenus" :key="index">
      <el-menu-item
        :index="item.url ? item.url + '' : item.id + ''"
        :key="item.id"
        v-if="!item.children || item.children.length == 0"
        :class="getPath(item.url) ? 'is-active' : 'unactive-menu'"
      >
        <div slot="title">
          <span class="iconfont icon" :class="item.icon"></span>
          <span>{{ item.name }}</span>
        </div>
      </el-menu-item>
      <el-submenu :index="item.id + ''" :key="item.id" v-else>
        <template slot="title">
          <span class="iconfont icon" :class="item.icon"></span>
          <span>{{ item.name }}</span>
        </template>
        <NavMenu :navMenus="item.children"></NavMenu>
      </el-submenu>
    </div>
  </div>
</template>
<script>
export default {
  props: ["navMenus"],
  name: "NavMenu",
  data() {
    return {};
  },
  computed: {
    url() {
      return this.$route.path + "";
    },
  },
  methods: {
    getPath(path) {
      let url = path.includes("?") ? path.split("?")[0] : path;
      return this.url.includes(url);
    },
  },
};
</script>

<style lang="less">
.menu-content {
  .el-menu-item {
    color: #000 !important;
  }
  .el-submenu__title {
    color: #000 !important;
  }
  .icon {
    text-align: left;
    font-size: 16px;
    margin-right: 10px;
  }
}
</style>
