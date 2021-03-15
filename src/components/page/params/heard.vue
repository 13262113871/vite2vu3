<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/hom' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>夫人你参数</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
export default {
   props:{

     },
  setup() {
    // 页面加载
    onMounted(() => {});
    //数据
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
