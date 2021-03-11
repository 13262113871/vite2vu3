<template>
  <div>
    <el-tabs>
      <!-- 第一个 -->
      <el-tab-pane label="用户管理">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="40"> </el-table-column>
          <el-table-column property="date" label="关键词" width="200">
          </el-table-column>
          <el-table-column property="name" label="搜索系数" width="200">
          </el-table-column>
          <el-table-column property="address" label="用户数"> </el-table-column>
        </el-table>
        <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
      </el-tab-pane>

      <!-- 第二个 -->
      <el-tab-pane label="配置管理">
        <el-table :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column type="index" width="40"> </el-table-column>
          <el-table-column property="date" label="111" width="200">
          </el-table-column>
          <el-table-column property="name" label="222" width="200">
          </el-table-column>
          <el-table-column property="address" label="333"> </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "胡晨阳",
          name: "22555",
          address: "652155",
        },
        {
          date: "胡晨阳",
          name: "22555",
          address: "652155",
        },
        {
          date: "胡晨阳",
          name: "22555",
          address: "652155",
        },
        {
          date: "胡晨阳",
          name: "22555",
          address: "652155",
        },
        {
          date: "胡晨阳",
          name: "22555",
          address: "652155",
        },
        {
          date: "胡晨阳",
          name: "22555",
          address: "652155",
        },
      ],
      currentRow: null,
    };
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="less"></style>
