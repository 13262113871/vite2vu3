<template>
  <div>
      <h1>Welcome!</h1>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
export default {
   name:"",
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
