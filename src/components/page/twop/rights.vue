<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 管理列表 -->
    <el-card>
          <el-table :data="List" border stripe >
            
              <el-table-column label="序号" type="index" width='100'></el-table-column>
              <el-table-column label="权限名称" prop="authName"></el-table-column>
              <el-table-column label="路径" prop="path"></el-table-column>
              <el-table-column label="权限等级" prop="level">
                    <template #default="scope">
                        <el-tag v-if="scope.row.level ==='0'">一级权限</el-tag>
                        <el-tag v-else-if="scope.row.level ==='1'" type="success">二级权限</el-tag>
                        <el-tag v-else type="warning">三级权限</el-tag>
                    </template>
              </el-table-column>
          </el-table>
    </el-card>


  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import {request} from 'netWork/axios'
export default {
  setup() {
    // 页面加载
    onMounted(() => {
      getList();
      
    });
    //数据
    const state = reactive({
         List:[]
    });


    const getList =()=>{
       request('/rights/list').then(res=>{
        console.log(res);
        state.List = res.data
      })
    }

    return {
      ...toRefs(state),
      getList
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
