<template>
  <div>
      <Breadcrumb></Breadcrumb>
      <Center></Center>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";

// 面包屑
import Breadcrumb from '../commodity_management/Breadcurumb.vue'
import Center from '../commodity_management/center.vue'
export default {
  components:{
        Breadcrumb,
        Center
  },
  setup() {
    // 页面加载
    onMounted(() => {});
    //数据
    const state = reactive({
          
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
