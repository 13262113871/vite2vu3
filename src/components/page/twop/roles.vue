<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-card>
      <!-- 添加角色 -->
      <el-row>
        <el-button type="primary" @click="dialogVisible = true"
          >添加角色</el-button
        >
      </el-row>

      <el-dialog
        title="添加用户"
        v-model="dialogVisible"
        width="60%"
        @close="close"
      >
        <!-- 数据列表 -->
        <el-form label-width="80px" :model="formLabelAlign">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="formLabelAlign.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="formLabelAlign.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <!-- 添加按钮 -->
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 列表 -->
      <el-table :data="list" border>
        <!-- 下拉权限管理 -->
        <el-table-column type="expand">
          <template #default="scope">
            <!-- 一级权限 -->
            <el-row
              :class="[index === 0 ? 'ontop' : '']"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
              class="onUser"
            >
              <el-col :span="6">
                <el-tag closable @close="remodel(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <!-- 二级权限 -->
                <el-row
                  :class="[index === 0 ? '' : 'ontop']"
                  v-for="(item2, index) in item.children"
                  :key="item2.id"
                  class="toUser"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="remodel(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="remodel(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <!-- 账户管理 -->
        <el-table-column
          type="index"
          prop="roleName"
          label="序号"
        ></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色藐视" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="small"
              @click="changeUser(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="small"
              @click="deleteUser(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-edit"
              size="small"
              @click="quanUser(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 修改数据 -->
      <el-dialog
        title="添加用户"
        v-model="xiuVisible"
        width="60%"
      >
        <!-- 数据列表 -->
        <el-form label-width="70px" :model="xiuAlign">
          <el-form-item label="角色名称" prop="username">
            <el-input v-model="xiuAlign.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="email">
            <el-input v-model="xiuAlign.roleDesc"></el-input>
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
    </el-card>

    <!-- 添加权限 -->
    <el-dialog title="提示" v-model="isShow" width="60%" @close="closeTree">
      <span>用户权限管理</span>

      <!-- 树型组件 -->
      <el-tree
        :data="quanList"
        show-checkbox
        :props="treeList"
        node-key="id"
        default-expand-all
        :default-checked-keys="checkoutKey"
        ref="refsdd"
      >
      </el-tree>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取 消</el-button>
          <el-button type="primary" @click="quanAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, resolveComponent ,ref} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Message from "element-plus/lib/el-message";
import { request } from "netWork/axios";

export default {
  setup() {
    // 页面加载
    onMounted(() => {
      getList();
    });
    //数据
    const state = reactive({
      list: [],

      // 添加数据
      dialogVisible: false,
      formLabelAlign: {
        roleName: "",
        roleDesc: "",
      },

      // 修改数据
      xiuVisible: false,
      xiuAlign: {},
      xiuId: "",
    });

    // 获取角色数据
    const getList = () => {
      request("roles").then((res) => {
        state.list = res.data;
      });
    };

    // 添加用户
    // 对话框关闭
    const close = () => {
      state.formLabelAlign.roleName = "";
      state.formLabelAlign.roleDesc = "";
    };
    // 点击添加用户
    const addUser = () => {
      request({
        url: "/roles",
        method: "post",
        data: state.formLabelAlign,
      }).then((res) => {
        if (res.meta.status !== 201) return ElMessage.error(res.meta.msg);
        ElMessage.success(res.meta.msg);
        state.dialogVisible = false;
        getList();
      });
    };

    //修改删除
    // 修改用户数据
    const changeUser = (id) => {
      request({
        url: `/roles/${id}`
      }).then((res) => {
        if (res.meta.status !== 200) return Message.error(res.meta.msg);
        Message.success(res.meta.msg);
        state.xiuAlign = res.data;
        state.xiuVisible = true;
      });
    };
    // id查询到后修改
    const xiuUser = () => {
      request({
        url: `/roles/${state.xiuAlign.roleId}`,
        method: "put",
        data: state.xiuAlign,
      }).then((res) => {
        if (res.meta.status !== 200) return Message.error(res.meta.msg);
        Message.success(res.meta.msg);
        getList();
        state.xiuVisible = false;
      });
    };

    // 删除用户
    const deleteUser = (id) => {
      ElMessageBox.confirm("是否确认删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "我在想想",
      })
        .then(() => {
          request({
            url: `/roles/${id}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status !== 200) return Message.error(res.meta.msg);
            Message.success(res.meta.msg);
            getList();
          });
        })
        .catch((action) => {
          Message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
          });
        });
    };

    // 删除某权限
    const remodel = (roleId, rightId) => {
      ElMessageBox.confirm("是否删除次权限", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "我在想想",
      })
        .then(() => {
          request({
            url: `/roles/${roleId.id}/rights/${rightId}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status !== 200) return Message.error(res.meta.msg);
            Message.success(res.meta.msg);
            roleId.children = res.data;
          });
        })
        .catch((action) => {
          Message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
          });
        });
    };

    // 获取权限相关
    const stateT = reactive({
      isShow: false,
      quanList: [],
      treeList:{
          label: 'authName',
          children: 'children'
      },
      checkoutKey:[],
      roleId:''
    });
    const refsdd = ref(null)

    // 权限授权
    const quanUser = (e) => {
      stateT.roleId = e.id
      request({
        url: "rights/tree",
      }).then((res) => {
        if (res.meta.status !== 200) return Message.error(res.meta.msg);
        Message.success(res.meta.msg);
        stateT.quanList = res.data;
        getdefaKey(e,stateT.checkoutKey)  
        stateT.isShow = true;
        // getList();
      });
    };

    // 添加权限
    const quanAdd = ()=>{
      const keys =[
        ...refsdd.value.getCheckedKeys(),
        ...refsdd.value.getHalfCheckedKeys()
      ]
          
      const idStr = keys.join(',')
      request({
        url:`roles/${stateT.roleId}/rights`,
        method:'post',
        data:{rids:idStr}
      }).then(res=>{
          if (res.meta.status !== 200) return Message.error(res.meta.msg);
          Message.success(res.meta.msg);
          getList()
      })
      stateT.isShow = false
    }

    //获取已有的权限
      var getdefaKey = (node,arr) => {
          if(!node.children){
            return arr.push(node.id)
          }
          node.children.forEach(item=>
              getdefaKey(item,arr)
          )
      }

      // 关闭对话框
      const closeTree = ()  =>{
        stateT.checkoutKey = []
      }

    return {
      ...toRefs(state),
      ...toRefs(stateT),
      getList,
      addUser,
      close,
      xiuUser,
      deleteUser,
      changeUser,
      quanUser,
      remodel,
      getdefaKey,
      closeTree,
      quanAdd,
      refsdd
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  .el-tag {
    margin: 10px;
  }
}
.ontop {
  border-top: 1px solid #ccc;
}
.onbottom {
  border-bottom: 1px solid #ccc;
}
.onUser {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.toUser {
  display: flex;
  align-items: center;
}
</style>
