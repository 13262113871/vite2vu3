<template>
  <div>
      222222222222222222
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
export default {
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
