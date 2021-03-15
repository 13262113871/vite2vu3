<template>
  <div>
    <el-card>
      <!-- 警告 -->
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        effect="dark"
      >
      </el-alert>

      <!-- 选择商品分类 -->
      <el-row class="shang">
        <div>选择商品分类:</div>
        <el-cascader
          v-model="selectFen"
          :options="shopList"
          :props="propsList"
          @change="handleChange"
        ></el-cascader>
      </el-row>

      <!-- tab标签 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="isButton" @click="dialogVisible = true"
            >动态参数</el-button
          >

          <!-- 动态表格参数 -->
          <el-table :data="manyList" border stripe>
            <!-- 展开 -->
            <el-table-column type="expand">
              <template #default="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                >
                  {{ item }}
                </el-tag>
                <!-- 添加 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 序号 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editShang(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeShang(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button :disabled="isButton" @click="dialogVisible = true"
            >静态属性</el-button
          >
          <!-- 静态表格参数 -->
          <el-table :data="onlyList" border stripe>
            <!-- 展开 -->
            <el-table-column type="expand">
              <template #default="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                >
                  {{ item }}
                </el-tag>

                <!-- 添加 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 序号 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editShang(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeShang(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加商品分类 -->
    <el-dialog
      :title="'添加' + tianName"
      v-model="dialogVisible"
      width="50%"
      @close="closetian"
    >
      <el-form :rules="rules" ref="rules" label-width="100px" :model="addName">
        <el-form-item :label="tianName" prop="attr_name">
          <el-input v-model="addName.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改商品 -->
    <el-dialog
      :title="'修改' + tianName"
      v-model="xiuShang"
      width="50%"
      @close="closetian"
    >
      <el-form :rules="rules" ref="rules" label-width="100px" :model="editName">
        <el-form-item :label="tianName" prop="attr_name">
          <el-input v-model="editName.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="xiuShang = false">取 消</el-button>
          <el-button type="primary" @click="editque">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { request } from "netWork/axios";
export default {
  props: {},
  setup() {
    //数据
    const state = reactive({
      // 商品列表
      shopList: [],
      // cascader绑定层级
      propsList: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 选中的父级分类
      selectFen: [],
    });
    // 获取全部商品
    const getList = () => {
      request({
        url: "/categories",
      }).then((res) => {
        state.shopList = res.data;
      });
    };
    // 选中父级选项卡后执行
    const handleChange = () => {
      if (state.selectFen.length !== 3) {
        ElMessage.error("只允许选择三级标签");
        state.selectFen = [];
        return;
      }
      getTabs();
    };

    // tabs选项卡
    const stateT = reactive({
      activeName: "many",
      manyList: [],
      onlyList: [],
    });

    // 添加标签
    const showInput = (row) => {
      row.inputVisible = true;
    };
    // 添加标签回车/失去焦点事件
    const handleInputConfirm = (row) => {
      row.attr_vals.push(row.inputValue);
      console.log(row.inputValue);

      request({
        url: `categories/${fieID.value}/attributes/${row.attr_id}`,
        method: "put",
        data: {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(", "),
        },
      }).then((res) => {
        console.log(res);
        row.inputVisible = false;
        row.inputValue = "";
      });
    };

    // 获取选中的数据
    const getTabs = () => {
      request({
        url: `categories/${fieID.value}/attributes`,
        params: { sel: stateT.activeName },
      }).then((res) => {
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : [];
          (item.inputVisible = false), (item.inputValue = "");
        });
        console.log(res.data);
        if (stateT.activeName === "many") {
          stateT.manyList = res.data;
        } else {
          stateT.onlyList = res.data;
        }
        console.log(stateT.manyList);
        console.log(stateT.onlyList);
      });
    };

    // 监听tabs切换
    const handleClick = () => {
      getTabs();
      console.log(stateT.activeName);
    };

    //添加按钮与禁用
    const isButton = computed(() => {
      if (state.selectFen.length !== 3) {
        return true;
      } else {
        return false;
      }
    });
    //获取id
    const fieID = computed(() => {
      if (state.selectFen.length === 3) {
        return state.selectFen[2];
      } else {
        return null;
      }
    });

    // 添加商品
    const tianS = reactive({
      dialogVisible: false,
      addName: {
        attr_name: "",
      },
    });

    let rules = {
      attr_name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
    };
    // 添加按钮显示添加商品
    const tianName = computed(() => {
      if (stateT.activeName === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    });

    // 监听添加对话框关闭
    const closetian = () => {
      tianS.addName.attr_name = "";
    };

    // 点击确定天机
    const add = () => {
      if (tianS.addName.attr_name !== "") {
        request({
          url: `categories/${fieID.value}/attributes`,
          method: "post",
          data: {
            attr_name: tianS.addName.attr_name,
            attr_sel: stateT.activeName,
          },
        }).then((res) => {
          console.log(res);
          if (res.meta.status !== 201) return ElMessage.error("添加失败");
          ElMessage.success(res.meta.msg);
          getTabs();
          tianS.dialogVisible = false;
        });
      }
    };

    // 修改商品
    const xiu = reactive({
      xiuShang: false,
      editName: {
        attr_name: "",
      },
      xiuId: null,
    });
    // 编辑前查询
    const editShang = (id) => {
      request({
        url: `categories/${fieID.value}/attributes/${id}`,
        params: {
          attr_sel: stateT.activeName,
        },
      }).then((res) => {
        xiu.editName = res.data;
      });
      xiu.xiuShang = true;
    };

    // 确认修改
    const editque = () => {
      request({
        url: `categories/${fieID.value}/attributes/${xiu.editName.attr_id}`,
        method: "put",
        data: {
          attr_name: xiu.editName.attr_name,
          attr_sel: stateT.activeName,
        },
      }).then((res) => {
        if (res.meta.status !== 200) return ElMessage.error("修改失败");
        ElMessage.success(res.meta.msg);
        getTabs();
      });
      xiu.xiuShang = false;
    };

    // 删除
    const removeShang = (id) => {
      request({
        url: `categories/${fieID.value}/attributes/${id}`,
        method: "delete",
      }).then((res) => {
        getTabs();
      });
    };

    // 页面加载
    onMounted(() => {
      getList();
    });
    return {
      ...toRefs(state),
      ...toRefs(stateT),
      ...toRefs(tianS),
      ...toRefs(xiu),
      handleChange,
      handleClick,
      isButton,
      fieID,
      tianName,
      rules,
      closetian,
      add,
      editShang,
      editque,
      removeShang,
      showInput,
      handleInputConfirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 20px;
}
.shang {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 20px;
}
.input-new-tag {
  width: 100px;
}
</style>
