<template>
  <div>
    <h1>Welcome!</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first" lazy>
          <Two></Two>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second" lazy>
            <One></One>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="three" lazy>
            <Three></Three>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import Two from "./echar/two.vue";
import One from './echar/one.vue';
import Three from './echar/three.vue';
export default {
  components: {
    Two,
    One,
    Three
  },
  props: {},
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
