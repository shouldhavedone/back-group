<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <cheader :isCollapse="isCollapse" @toggleNav="toggleNav"></cheader>
      </el-header>
      <el-container class="content-wrap">
        <el-aside>
          <div class="menu">
            <el-scrollbar ref="myScrollbar">
              <el-menu
                :collapse="isCollapse"
                :deault-active="$route.path"
                class="el-menu-vertical-demo"
                :default-openeds="openSubs"
                :unique-opened="true"
                text-color="#fff"
                router
              >
                <cside :navMenus="menuList"></cside>
              </el-menu>
            </el-scrollbar>
          </div>
        </el-aside>
        <el-main>
          <router-view
            v-if="!$route.meta.keepalive"
            :key="$route.path"
          ></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import cheader from "./header";
import cside from "./side";
export default {
  components: {
    cheader,
    cside,
  },

  data() {
    return {
      menuList: [
        {
          id: "1",
          icon: "iconblog",
          name: "博客管理",
          url: "/blog",
          children: [
            {
              id: "1-1",
              url: "/blog/home",
              icon: "icontongji",
              name: "数据统计",
            },
            {
              id: "1-2",
              url: "/blog/article",
              icon: "iconarticle",
              name: "文章管理",
            },
            {
              id: "1-3",
              url: "/blog/label",
              icon: "iconlabel1",
              name: "分类管理",
            },
            {
              id: "1-4",
              url: "/blog/project",
              icon: "iconxiangmu",
              name: "项目管理",
            },
            {
              id: "1-5",
              url: "/blog/message",
              icon: "iconmessage",
              name: "留言管理",
            },
          ],
        },
        {
          id: "10",
          icon: "iconshezhi",
          name: "系统设置",
          url: "/setting",
        },
      ],
      openSubs: ["1"],
      isCollapse: false,
    };
  },

  methods: {
    toggleNav(val) {
      console.log(val);
      this.isCollapse = val;
    },
  },
};
</script>
<style lang="less">
@width: 100vw/1920px;
@height: 100vh/960px;

.app-container {
  height: 100%;
  width: 100%;

  & > :first-child {
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .content-wrap {
    height: 100%;
    .el-aside {
      width: auto !important;
      .menu {
        height: 100%;
      }
    }
  }

  .el-scrollbar {
    height: 100%;

    .el-scrollbar__view {
      height: 100%;
    }

    .el-menu {
      height: 100%;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  color: #000;
  width: 240px * @width;
}
</style>