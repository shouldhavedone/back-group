<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <cheader></cheader>
      </el-header>
      <el-container class="content-wrap">
        <el-aside>
          <div class="menu">
            <el-scrollbar style="height: 100%" ref="myScrollbar">
              <el-menu
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
        <el-main>Main</el-main>
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
              url: "/blog/article",
              icon: "iconarticle",
              name: "文章管理",
              children: [
                {
                  id: "1-1-1",
                  url: "/blog/article/add",
                  icon: "iconarticle",
                  name: "测试",
                },
              ],
            },
            {
              id: "1-2",
              url: "/blog/label",
              icon: "iconlabel",
              name: "分类管理",
            },
            {
              id: "1-3",
              url: "/blog/project",
              icon: "iconxiangmu",
              name: "项目管理",
            },
            {
              id: "1-4",
              url: "/blog/message",
              icon: "iconmessage",
              name: "留言管理",
            },
          ],
        },
      ],
    };
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
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-aside {
    width: 200px * @width !important;
    background-color: #fff;
  }

  .menu {
    height: 100%;
    .submenu-icon {
      display: inline-block;
      width: 20px * @width;
      height: 23px * @width;
      opacity: 0.56;
      overflow: hidden;
      background-size: 100%;
      vertical-align: middle;
    }

    .submenu-icon:after {
      content: "";
      display: block;
      height: 100%;
      transform: translateX(-100%);
      background: inherit;
      filter: drop-shadow(20px * @width 0 0 rgba(40, 120, 255));
    }

    span {
      margin-left: 17px * @width;
      vertical-align: middle;
    }

    .is-active.el-menu-item .submenu-icon {
      margin-right: 2px;
    }

    .is-active.el-menu-item .submenu-icon:after {
      filter: drop-shadow(20px * @width 0 0 #fff);
    }

    .unactive-menu.el-menu-item .submenu-icon:after {
      filter: drop-shadow(20px * @width 0 0 rgba(40, 120, 255)) !important;
    }

    .el-submenu {
      position: relative;

      & > .el-submenu__title {
        padding-left: 15px !important;
        text-align: left;
        height: 56px * @height;
        line-height: 56px * @height;
        color: #666 !important;
        font-size: 14px;

        i {
          color: #666;
        }
      }

      .el-submenu {
        .el-menu-item {
          padding-left: 55px !important;
          font-size: 12px;
        }

        .el-submenu__title {
          font-size: 12px;
          padding-left: 40px !important;
        }
      }
    }

    .el-submenu:hover {
      & > .el-submenu__title {
        background: rgba(231, 238, 243, 1);
      }
    }

    .el-menu {
      height: 100%;
      text-align: left;
      border-right: none;
      background: #fefefe;

      .el-menu-item {
        font-family: PingFangSC-Regular;
        padding-left: 0 !important;
        color: #666 !important;
        height: 48px * @height;
        line-height: 48px * @height;
        font-size: 12px;

        & > div {
          display: inline-block;
          img:nth-child(1) {
            margin-left: 30px * @width;
          }
        }

        span {
          display: inline-block;
        }
      }

      .is-active.el-menu-item {
        background: rgba(40, 120, 255, 0.1) !important;
        color: #333 !important;
      }

      .is-active.el-menu-item:after {
        position: absolute;
        content: " ";
        left: 0px;
        width: 3px;
        height: 55px * @height;
        background: rgba(38, 82, 254, 1);
      }

      // .unactive-menu.el-menu-item {
      //   background: none !important;
      //   color: #666 !important;
      // }

      .unactive-menu.el-menu-item::before {
        opacity: 0;
      }

      .unactive-menu.el-menu-item:hover {
        color: rgba(40, 120, 255) !important;
      }
    }

    .is-opened {
      background: #eff4f8 !important;

      .el-menu {
        text-align: left;
        background: #eff4f8 !important;
      }
    }
  }

  .el-menu-vertical-demo > .menu-content > div > .el-menu-item {
    font-size: 14px !important;
    height: 56px * @height;
    line-height: 56px * @height;
    font-size: 14px;

    i {
      color: #666;
    }
  }
}
</style>