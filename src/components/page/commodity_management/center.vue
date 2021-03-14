<template>
  <div>
    <!-- 内容 -->
    <el-card shadow="hover">
      <!-- 添加按钮 -->
      <el-row>
        <el-button type="warning" @click="addFen">添加分类</el-button>
      </el-row>

      <!-- 列表 -->
      <el-table
        :data="shopList"
        style="width: 100%"
        border
        lazy
        row-key="cat_id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- 商品列表 -->
        <el-table-column prop="cat_name" label="商品名称"></el-table-column>

        <!-- 是否有效 -->
        <el-table-column prop="name" label="是否有效">
          <template #default="scope">
            <i
              class="el-icon-success"
              style="color: #13ce66"
              v-if="scope.row.cat_deleted === true"
            ></i>
            <i class="el-icon-error" style="color: #f25022" v-else></i>
          </template>
        </el-table-column>

        <!-- 排序 -->
        <el-table-column prop="address" label="排序">
          <template #default="scope">
            <el-tag size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag
              type="success"
              size="small"
              v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" size="small" v-else>三级</el-tag>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="bianFen(scope.row.cat_id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeFen(scope.row.cat_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfor.pagenum"
        :page-sizes="[4, 10, 20, 50]"
        :page-size="queryInfor.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      v-model="fenisShow"
      width="50%"
      @close="closeFen"
    >
      <!-- 数据 -->
      <el-form :rules="rules" ref="rules" label-width="100px" :model="fenAdd">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="fenAdd.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectFen"
            :options="shopList"
            :props="propsList"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="fenisClose">取 消</el-button>
          <el-button type="primary" @click="fenisQuery">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改数据 -->
    <el-dialog title="添加用户" v-model="xiuVisible" width="60%">
      <!-- 数据列表 -->
      <el-form label-width="70px" :model="xiuAlign">
        <el-form-item label="修改的值" prop="username">
          <el-input v-model="xiuAlign.cat_name"></el-input>
        </el-form-item>
      </el-form>

      <!-- 添加按钮 -->
      <template #footer>
        <span>
          <el-button @click="xiuVisible = false">取 消</el-button>
          <el-button type="primary" @click="xiuUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { request } from "netWork/axios";
export default {
  setup() {
    //数据
    const state = reactive({
      // 商品列表
      shopList: [],
      // 查询条件
      queryInfor: {
        type: 3,
        pagenum: 1,
        pagesize: 3,
      },
      // 获取数据条数
      total: 0,
    });

    // 获取商品分类数据列表
    const getList = () => {
      request({
        url: "/categories",
        params: state.queryInfor,
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) return ElMessage.error("数据加载失败");
        ElMessage.success(res.meta.msg);
        state.shopList = res.data.result;
        state.total = res.data.total;
      });
    };

    // 分页
    const handleSizeChange = (newSize) => {
      state.queryInfor.pagesize = newSize;
      getList();
    };
    const handleCurrentChange = (newPage) => {
      state.queryInfor.pagenum = newPage;
      getList();
    };

    // 添加分类
    const stateT = reactive({
      // 对话框显示隐藏
      fenisShow: false,

      // 添加分类传输数据
      fenAdd: {
        // 父级分类ＩＤ
        cat_pid: 0,
        // 分类层级
        cat_level: 0,
        // 分类名称
        cat_name: "",
      },

      // cascader绑定层级
      propsList: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 选中的父级分类
      selectFen: [],
    });

    // 添加分类
    const addFen = () => {
      stateT.fenisShow = true;
    };

    // 确认
    const fenisQuery = () => {
      request({
        url: "/categories",
        method: "post",
        data: stateT.fenAdd,
      }).then((res) => {
        if (res.meta.status == !201) return ElMessage.error("分类添加失败");
        ElMessage.success(res.meta.msg);
        getList();
        stateT.fenisShow = false;
      });
    };
    // 取消
    const fenisClose = () => {
      stateT.fenisShow = false;
    };
    // 关闭添加分类对话框
    const closeFen = () => {
      stateT.fenAdd = {
        cat_pid: 0,
        // 分类层级
        cat_level: 0,
        // 分类名称
        cat_name: "",
      };

      (stateT.selectFen = []), (stateT.fenAdd.cat_pid = 0);
      stateT.fenAdd.cat_level = 0;
    };

    // 添加分类验证规则
    let rules = {
      cat_name: [
        { required: true, ElMessage: "分类名称不能为空", trigger: "blur" },
      ],
    };

    // 选中父级分类后执行
    const handleChange = () => {
      if (stateT.selectFen.length > 0) {
        stateT.fenAdd.cat_pid = stateT.selectFen[stateT.selectFen.length - 1];
        stateT.fenAdd.cat_level = stateT.selectFen.length;
        return;
      } else {
        stateT.selectFen.cat_pid = 0;
        stateT.fenAdd.cat_level = 0;
      }
    };

    // 修改数据
    const stateS = reactive({
      // 修改数据
      xiuVisible: false,
      xiuAlign: {},
      xiuId: "",
      roleId: "",
    });

    // 修改
    // 查询
    const bianFen = (id) => {
      stateS.roleId = id;
      request({
        url: `/categories/${id}`,
      }).then((res) => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg);
        ElMessage.success(res.meta.msg);
        stateS.xiuAlign = res.data;
        stateS.xiuVisible = true;
      });
    };

    // 查询到id后修改
    const xiuUser = () => {
      console.log(stateS.roleId);
      console.log(stateS.xiuAlign.cat_name);
      request({
        url: `/categories/${stateS.roleId}`,
        method: "put",
        data: stateS.xiuAlign,
      }).then((res) => {
        if (res.meta.status !== 200) return ElMessage.error(res.meta.msg);
        ElMessage.success(res.meta.msg);
        getList();
        stateS.xiuVisible = false;
      });
    };

    // 删除
    const removeFen = (id) => {
      console.log(id);
      ElMessageBox.confirm("是否确认删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "我在想想",
      }).then(() => {
          request({
            url: `/categories/${id}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status !== 200) return ElMessage.error(res.meta.msg);
            ElMessage.success(res.meta.msg);
            getList();
          });
        })
        .catch((action) => {
          ElMessage({
            type: "info",
            ElMessage:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
          });
        });
    };

    // 页面加载
    onMounted(() => {
      getList();
    });

    return {
      ...toRefs(state),
      ...toRefs(stateT),
      ...toRefs(stateS),
      getList,
      handleSizeChange,
      handleCurrentChange,
      addFen,
      rules,
      fenisQuery,
      fenisClose,
      handleChange,
      closeFen,
      bianFen,
      removeFen,
      xiuUser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
