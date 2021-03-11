<template>
  <el-container class="out">
    <!-- hearder -->
    <el-header>
      <div class="heardLogo">
        <img src="~assets/logo.svg" alt="" />
        <span>E-commerce background management system</span>
      </div>

      <el-button type="primary" size="small" plain @click="loginOut"
        >退出登录</el-button
      >
    </el-header>

    <!-- center -->
    <el-container>
      <!-- 切换大小 -->

      <!-- aside -->
      <el-aside :width="isflod ? '66px' : '160px'">
        <el-menu background-color="#b83b5e">
          <el-menu-item @click="bigSmle">
            <i class="el-icon-thumb"></i>
          </el-menu-item>
        </el-menu>

        <el-menu
          :default-active="$route.path"
          background-color="#b83b5e"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isflod"
          :collapse-transition="isflod"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template #title>
              <i :class="icon[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/home/' + child.path"
              v-for="child in item.children"
              :key="child.id"
            >
              <i class="el-icon-loading"></i>
              <span>{{ child.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- main -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { onMounted, getCurrentInstance, toRefs, reactive } from "vue";
import { request } from "netWork/axios";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    let state = reactive({
      menuList: [],
      isflod: false,
    });
    var icon = {
      125: "el-icon-s-goods",
      103: "el-icon-upload",
      101: "el-icon-message-solid",
      102: "el-icon-camera-solid",
      145: "el-icon-s-promotion",
    };

    // 退出登录
    const loginOut = () => {
      // 清空token 并跳转到登录页面
      window.sessionStorage.clear();
      ctx.$router.push("/login");
    };
    //获取菜单
    const getMenu = () => {
      request("menus").then((res) => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        state.menuList = res.data;
      });
    };
    // 侧边栏切换大小
    const bigSmle = () => {
      state.isflod = !state.isflod;
    };

    //加载页面
    onMounted(() => {
      getMenu();
    });

    return {
      ...toRefs(state),
      loginOut,
      icon,
      bigSmle,
    };
  },
};
</script>

<style scoped lang="scss">
.out {
  height: 100%;
}
// hearder
.el-header,
.el-footer {
  background-color: #6a2c70;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .heardLogo {
    display: flex;
    align-items: center;
    span {
      color: #fff;
      font-size: 24px;
      margin: 0 10px;
      font-family: "hcy";
    }
  }
}

// aside
.el-aside {
  background-color: #b83b5e;
  color: #fff;
  text-align: center;
  .el-menu {
    border: none;
  }
}

// main
.el-main {
  color: #d2357d;
  text-align: center;
}
</style>
