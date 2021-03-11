<template>
  <div>
      66666666666666
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
