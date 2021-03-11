<template>
  <div class="out">
    <div class="inner">
      <div class="heard">
        <img src="~assets/logo.svg" alt="" />
      </div>
      <div class="center">
        <el-form ref="user" :model="user" :rules="rules">
          <!-- 账号 -->
          <el-form-item prop="username">
            <el-input
              v-model="user.username"
              prefix-icon="el-icon-s-custom"
            ></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="user.password"
              type="password"
              prefix-icon="el-icon-s-help"
            ></el-input>
          </el-form-item>

          <!-- 登录重置 -->
          <el-form-item class="btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetting">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import { request } from "netWork/axios";
export default {
  data() {
    return {
      user: {
        username: "admin",
        password: "123456",
      },

      //   表单验证
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 13,
            message: "长度在 4 到 13 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置
    resetting() {
      this.$refs.user.resetFields();
    },
    // 提交验证
    login() {
      this.$refs.user.validate((valid) => {
        if (!valid) return;

        request({
          url: "/login",
          method: "post",
          params: {
            username: this.user.username,
            password: this.user.password,
          },
        }).then((res) => {
          console.log(res);
          if (res.meta.status !== 200)  return this.$message.error("登陆失败");
          this.$message({ message: "登录成功", type: "success" });

          // 将token保存到sessionStorage中
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push("/home");
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.out {
  background-color: #2b4b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 29.375rem;
    height: 21.25rem;
    border: 1px solid #ccc;
    position: relative;
    background-color: #fff;
    border-radius: 5px;

    .heard {
      background-color: rgb(34, 95, 148);
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      box-shadow: 0px 0px 1.875rem rgb(245, 14, 14);
      position: absolute;
      top: -5.625rem;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 100%;
      }
    }
    .center {
      width: 100%;
      padding: 0.625rem;
      box-sizing: border-box;
      position: absolute;
      top: 6.125rem;
      .btn {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
