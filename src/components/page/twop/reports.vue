<template>
  <div>
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>


<!-- 图标展示 -->
    <el-card>
          <One></One>
    </el-card>  
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import One from '../echar/one.vue'
export default {
  components:{
      One
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
