<template>
  <div class="out">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card shadow="hover">

      <!-- 头部 -->
      <el-row>
        <el-col :span="6">
          <el-input placeholder="点击搜索" v-model="userinfo.query" @clear="getList" clearable @change="getList">
              <template #append>
                <el-button icon="el-icon-search" @click="getList"></el-button>
              </template>
          </el-input>
        </el-col>
        <el-col :span="3"><el-button type="primary" @click="dialogVisible=true">添加用户</el-button></el-col>
      </el-row>

      <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      v-model="dialogVisible"
      width="60%"
      @close='close'
      >

      <!-- 数据列表 -->
          <el-form :rules='rules' ref="rules" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名" prop="username">
                    <el-input v-model="formLabelAlign.username"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                     <el-input v-model="formLabelAlign.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formLabelAlign.email"></el-input>
               </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="formLabelAlign.mobile"></el-input>
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

    <!-- 修改数据 -->
      <el-dialog
      title="添加用户"
      v-model="xiuVisible"
      width="60%"
      >

      <!-- 数据列表 -->
          <el-form :rules='rules' ref="rules" label-width="70px" :model="xiuAlign">
              <el-form-item label="用户名" prop="username">
                    <el-input v-model="xiuAlign.username" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                    <el-input v-model="xiuAlign.email"></el-input>
               </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="xiuAlign.mobile"></el-input>
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

    <!-- 数据列表 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150" ></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="stateSwitch(scope.row)">
            </el-switch>
          </template>  
        </el-table-column>
        <el-table-column label="操作" width="200">


          <!-- 按钮 -->
          <template v-slot="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="changeUser(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分配权限" placement="top-end">
                  <el-button type="warning" icon="el-icon-setting" size="mini" @click="quanUser(scope.row.id)"></el-button>
              </el-tooltip>
           </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userinfo.pagenum"
            :page-sizes="[1, 10, 20, 100]"
            :page-size="userinfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="fenye"
        >
       </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import {ElMessage,ElMessageBox} from 'element-plus'
import { request } from "netWork/axios";
import Message from 'element-plus/lib/el-message';
export default {
  setup() {
    
    let state = reactive({
      userinfo: {
        query:'',
        pagenum: 1,
        pagesize: 10,
      },
      total:null,
      userList: [],


      // 添加用户信息
      dialogVisible:false,
      formLabelAlign:{
          username:'',
          password:'',
          email:'',
          mobile:''
      },

      // 修改数据
      xiuVisible:false,
      xiuAlign:{},
      xiuId:''
    });


// 获取用户信息
    const getList = () => {
      request({
        url: "/users",
        params: state.userinfo
      }).then((res) => {
        if (res.meta.status !== 200) return ElMessage.error("获取用户信息失败");
        state.userList = res.data.users;
        state.total = res.data.total
      });
    };


  // 监听每页显示数量
  const handleSizeChange = (e)=>{
        state.userinfo.pagesize = e
        getList();
  }

  // 监听页数
  const handleCurrentChange = (e)=>{
        state.userinfo.pagenum = e
        getList();
  }


// 修改用户状态
  const stateSwitch = (e)=>{
    request({
      url:`users/${e.id}/state/${e.mg_state}`,
      method:'put',
    }).then(res=>{
      if(res.meta.status !== 200){
         e.mg_state = !e.mg_state;
          return ElMessage.error(res.meta.msg);
      }
      ElMessage.success(res.meta.msg)
    })
  }


  // 添加用户
    // 对话框关闭
  const close = () =>{
        state.formLabelAlign.username=''
        state.formLabelAlign.password=''
        state.formLabelAlign.email=''
        state.formLabelAlign.mobile=''
  }
  // 点击添加用户
  const addUser = ()=>{

      request({
        url: "/users",
        method:'post',
        data: state.formLabelAlign
      }).then((res) => {
        if(res.meta.status !== 201) return Message.error(res.meta.msg)
        Message.success(res.meta.msg)
        state.dialogVisible = false
        getList();
      });
  }

  // 修改用户数据
   const changeUser = (id)=>{
      request({
        url: `/users/${id}`,
      }).then((res) => {
        if(res.meta.status !== 200) return Message.error(res.meta.msg)
        Message.success(res.meta.msg)
        state.xiuAlign = res.data
        state.xiuVisible = true
      });
  }
  // id查询到后修改
  const xiuUser = () =>{
      request({
        url: `/users/${state.xiuAlign.id}`,
        method:"put",
        data:state.xiuAlign
      }).then((res) => {
        if(res.meta.status !== 200) return Message.error(res.meta.msg)
        Message.success(res.meta.msg)
        getList();
        state.xiuVisible = false
      });
  }


  // 删除用户
  const deleteUser = (id) =>{
     ElMessageBox.confirm('是否确认删除', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认删除',
          cancelButtonText: '我在想想'
        })
          .then(() => {
            request({
               url: `/users/${id}`,
                method:'delete'
               }).then((res) => {
                    if(res.meta.status !== 200) return Message.error(res.meta.msg)
                     Message.success(res.meta.msg)
             getList();
      });
          })
          .catch(action => {
            ElMessage({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
      
  }
  // 修改用户权限
  const quanUser = (id) =>{
      request({
        url: `/users/${id}role`,
        method:'put'
      }).then((res) => {
        if(res.meta.status !== 200) return Message.error(res.meta.msg)
        Message.success(res.meta.msg)
        getList();
      });
  }


// 表单验证
// 手机号验证
const checkMobile = (rule, value, cb) => {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    cb();
  } else {
    cb(new Error("手机号码格式不正确"));
  }
};

   // 表单校验规则
  let rules = {
          username: [
             { required: true, message: '用户名不能为空', trigger: 'blur' },
             { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          password: [
              { required: true, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱',trigger: 'blur' },
            { type:"email",message: '请输入正确的邮箱格式',trigger: ['blur','change']}
          ],
          mobile: [
            { validator: checkMobile, trigger: 'blur' }
          ],
        }


    onMounted(() => {
      getList();
    });
    return { 
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      stateSwitch,
      getList,
      close,
      addUser,
      changeUser,
      xiuUser,
      deleteUser,
      quanUser,
      rules
    };
  },
};
</script>

<style scoped lang="scss">
.el-breadcrumb {
  font-size: 16px;
  font-family: "hcy";
}
.el-card {
  margin: 20px 0px;
  .el-table {
    margin-top: 20px;
    box-sizing: border-box;
  }
  .fenye{
    padding-top: 20px;
  }
}
</style>
