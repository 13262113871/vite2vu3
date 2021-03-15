<template>
  <div>
      <Heard></Heard>
      <Center></Center>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import Heard from '../params/heard.vue'
import Center from '../params/center.vue'
export default {
  components:{
    Heard,
    Center
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
