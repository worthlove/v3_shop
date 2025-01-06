<!--
* @Author: GZF
* @Date: 2024-11-15 22:29:31
* @Description: userList 页面
-->
<template>
  <div style="height: 100%;">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userList' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="scroll-card">
      <el-card style="margin-bottom: 1rem;">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="queryInfo.query" clearable placeholder="请输入搜索内容" @clear='getUserListFn'>
                <template #append>
                  <el-button icon="Search" @click="queryFn" />
                </template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="box-item" content="点击此按钮,弹出页面进行用户添加" effect="dark" placement="right-start">
                <el-button plain type="primary" @click="addUserInfoFn">添加用户</el-button>
              </el-tooltip>
            </el-col>
            <!-- <el-col :span="4">
              <el-tooltip class="box-item" content="点击此按钮,弹出页面进行批量删除用户" effect="dark" placement="right-start">
                <el-button plain type="danger" @click="deleteUserInfoFn">批量删除用户</el-button>
              </el-tooltip>
            </el-col> -->
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <MTable ref="elTablesRef" :index-method="indexMethods" :labelList="TableLabel" :resizeable=true
          :tableData="tableData" border class="elTables" style="height: 25.626rem" tableSize="small"
          @multipleSelectChange="multipleSelectChangeFn">
        </MTable>
        <el-pagination :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" :page-sizes="[1, 5, 10, 15]"
          :total="total" background layout="->, total,sizes, prev, pager, next, jumper" size="small"
          style="margin-top: 1rem;" @size-change="handleSizeChangeFn"
          @current-change="handleCurrentChangeFn"></el-pagination>
      </el-card>
    </el-card>
    <MDrawer ref="drawerRef" :title="DrawerTitle" conText="确认" conText1="取消" direction="rtl" size="40%"
      @cancel="cancelFn" @submit="submitFn">
      <template #DrawerBody>
        <!-- 新增用户所需表单 -->
        <el-form v-if="isAddMode === 1" ref='ruleFormRef' :model='addFromData' :rules='addFromRules' label-width='70px'>
          <el-form-item label='用户名:' prop='username'>
            <el-input v-model='addFromData.username'></el-input>
          </el-form-item>
          <el-form-item label='密码:' prop='password'>
            <el-input v-model='addFromData.password'></el-input>
          </el-form-item>
          <el-form-item label='邮箱:' prop='email'>
            <el-input v-model='addFromData.email'></el-input>
          </el-form-item>
          <el-form-item label='手机:' prop='mobile'>
            <el-input v-model='addFromData.mobile'></el-input>
          </el-form-item>
        </el-form>
        <el-form v-if="isAddMode === 2" ref='editFormRef' :model='editFromData' :rules="editFromRules"
          label-width='70px'>
          <el-form-item label='用户名'>
            <el-input v-model='editFromData.username' disabled></el-input>
          </el-form-item>
          <el-form-item label='邮箱' prop='email'>
            <el-input v-model='editFromData.email'></el-input>
          </el-form-item>
          <el-form-item label='手机' prop='mobile'>
            <el-input v-model='editFromData.mobile'></el-input>
          </el-form-item>
        </el-form>
        <el-form v-if="isAddMode === 3" :model='userInfo' label-width='70px'>
          <el-form-item label='当前用户'>
            <el-input v-model='userInfo.username' disabled></el-input>
          </el-form-item>
          <el-form-item label='当前角色'>
            <el-input v-model='userInfo.role_name' disabled></el-input>
          </el-form-item>
          <el-form-item label='角色分配'>
            <el-select v-model='selectedRolesId' placeholder='请选择角色分配' style='width: 100%'>
              <el-option v-for='(item) in roleseList' :key='item.id' :label='item.roleName' :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </MDrawer>
  </div>
</template>

<script lang="tsx" setup>
// 导入图标、组件、工具函数、样式、请求接口
import { Edit, Delete, Setting} from '@element-plus/icons-vue'
import MTable from "@/components/table/m-table/mTable.vue";
import MDrawer from '@/components/drawer/mDrawer.vue'
import {validateEMail, validatePhone} from '@/utils/checkReg.js'
import {ElButton, ElForm, ElNotification} from "element-plus";
import {
  addUserApi,
  userListApi,
  userSwitchApi,
  deleteUserApi,
  getUserInfoApi,
  updateUserInfoApi,
  getUserRoleApi,
  assignUserRoleApi
} from "@/api/usersApi";

// 定义初始化数据
const queryInfo = ref({
  query: '',
  // 当前页数
  pagenum: 1,
  // 当前页面显示多少条数据
  pagesize: 10
})
// 定义总条数
const total = ref(0)
// Drawer组件标题
const DrawerTitle = ref()
// 新增用户模式 1 ｜ 编辑用户模式  2 ｜ 分配角色模式 3
const isAddMode = ref(1);
// 新增表单
const addFromData = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
// 新增表单校验规则
const addFromRules = ref({
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}, {
    min: 3,
    max: 10,
    message: '用户名的长度在 3 到 10 个字符',
    trigger: 'blur'
  }],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}, {
    min: 3,
    max: 15,
    message: '长度在 3 到 18 个字符',
    trigger: 'blur'
  }],
  email: [{required: true, validator: validateEMail, trigger: 'blur'}],
  mobile: [{required: true, validator: validatePhone, trigger: 'blur'}]
})
// 编辑表单
const editFromData = ref({
  username: '',
  email: '',
  mobile: ''
})

// 编辑表单校验规则
const editFromRules = {
  email: [
    {
      required: true,
      validator: validateEMail,
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      validator: validatePhone,
      trigger: 'blur'
    }
  ]
}

// 用户信息
const userInfo = ref({
  username: '',
  role_name: '',
  role_id: ''
})

// 获取用户信息
const roleseList = ref<{ id: number; roleName: string }[]>([])

// 选中的角色ID
const selectedRolesId = ref('')

// drawer 组件的引用
const drawerRef = ref<InstanceType<typeof MDrawer> | null>(null)
// 表格组件的引用
const ruleFormRef = ref<InstanceType<typeof ElForm> | null>(null)
// 编辑表单
const editFormRef = ref<InstanceType<typeof ElForm> | null>(null)


// 表格表头的数据
const TableLabel = [
  {type: 'selection', selection: 'checkedBox', fixed: 'left'},
  {
    type: 'expand',
    width: 85,
    fixed: 'left',
    label: "Expand",
    // expand: true,
    render: (props: any) => { // 渲染函数
      return (
          <>
            <el-card>
              <el-tag>{JSON.stringify(props.row, null, 2)}
              </el-tag>
            </el-card>
          </>
      )
    }
  },
  {type: 'index', fixed: 'left', label: "#",},
  {
    label: '姓名',
    prop: 'username',
    align: 'center',
    headerRender: true,
    render: (scope: any) => {
      return (
          <a
              style="color:#409EFF;cursor:pointer;text-decoration:underline"
              onClick={() => {
                alert(JSON.stringify(scope.row, null, 2))
              }}
          >
            {scope.row.username}
          </a>
      )
    }
  }, {
    label: '邮箱',
    prop: 'email',
    align: 'center',
    width: 150
  }, {
    label: '电话', // 列的标签
    prop: 'mobile', // 列的属性名
    align: 'center', // 内容对齐方式
    showOverflowTooltip: true // 当内容过长时显示省略号
  }, {
    label: '角色',
    prop: 'role_name',
    align: 'center'
  }, {
    label: 'ID',
    prop: 'id',
    align: 'center'
  }, {
    label: '状态',
    prop: 'state',
    align: 'center',
    headerRender: true,
    headerStyle: {backgroundColor: '#429488', color: 'white'},
    render: (scope: any) => { // 渲染函数
      return (
          <el-switch
              v-model={scope.row.mg_state}
              active-text={scope.row.mg_state ? "启用" : "禁用"}
              active-value={true}
              disabled={scope.row.id === 500}
              inactive-value={false}
              active-color='#00CC00'
              inactive-color='#DDDDDD'
              onClick={() => userStateChangeEvent(scope.row)}
          />
      )
    }
  }, {
    label: '操作',
    prop: 'caoZuo',
    align: 'center',
    width: 350,
    render: (scope: any) => {
      return (
          <>
            <el-tooltip content={scope.row.id === 500 ? '禁止编辑' : '编辑'} effect="dark" placement="top">
              <el-button link disabled={scope.row.id === 500} size='default' type='primary'
                         onClick={() => editFn(scope.row)}>
                <el-icon>
                  <Edit/>
                </el-icon>
                &nbsp;{scope.row.id === 500 ? '禁止编辑' : '编辑'}
              </el-button>
            </el-tooltip>

            <el-tooltip content={scope.row.id === 500 ? '禁止删除' : '删除'} effect="dark" placement="top">
              <el-button link disabled={scope.row.id === 500} size='default' type='danger'
                         onClick={() => deleteFn(scope.row.id)}>
                <el-icon>
                  <Delete/>
                </el-icon>
                &nbsp;{scope.row.id === 500 ? '禁止删除' : '删除'}
              </el-button>
            </el-tooltip>

            <el-tooltip content={scope.row.id === 500 ? '禁止分配角色' : '分配角色'} effect="dark" placement="top">
              <el-button link size='default' disabled={scope.row.id === 500} type='warning'
                         onClick={() => settingFn(scope.row)}>
                <el-icon>
                  <Setting/>
                </el-icon>
                &nbsp;{scope.row.id === 500 ? '禁止分配角色' : '分配角色'}
              </el-button>
            </el-tooltip>
          </>
      )
    }
  }
]

// 定义一个表格数据
const tableData = ref<any[]>([])

/**
 * 获取用户信息
 * @param query 查询条件
 */
const getUserListFn = (query: string) => {
  queryInfo.value.pagenum = 1;
  queryInfo.value.query = query
  queryFn()
}


/**
 * 修改用户状态
 * @param row 用户信息参数
 */
const userStateChangeEvent = (row: any) => {
  if (row.id === 500) return
  userSwitchApi(row).then(res => {
    if ((res as any).meta.status === 200) {
      ElNotification.success((res as any).meta.msg)
    } else {
      row.state = !row.state
      ElNotification.error((res as any).meta.msg)
    }
    getUserListFn('')
  })
}
/**
 * 对数据进行排序，确保ID为500的用户在第一行
 * @param data 用户信息数组
 */
const sortData = (data: any[]) => {
  return data.sort((a, b) => {
    if (a.id === 500) return -1;
    if (b.id === 500) return 1;
    return a.id - b.id;
  });
}

/**
 * 调用API接口查询用户信息, 并赋值给表格
 */
const queryFn = () => {
  userListApi(queryInfo.value).then(res => {
    if ((res as any).meta.status === 200) {
      // 直接赋值数组
      tableData.value = sortData(res.data.users);
      total.value = res.data.total
    }
  })
}
/**
 * 表格的序号
 * @param index 序号
 * @returns {number} 序号
 */
const indexMethods = computed(() => {
  return (index: number): number => {
    return (queryInfo.value.pagenum - 1) * queryInfo.value.pagesize + index + 1
  }
})

/**
 * 分页组件的方法 - 每页显示多少条数据
 * @param newSize 每页显示多少条数据
 * @returns {void}
 */
const handleSizeChangeFn = (newSize: number) => {
  console.log('分页组件的方法 - 每页显示多少条数据');
  queryInfo.value.pagenum = 1;
  queryInfo.value.pagesize = newSize;
  queryFn()
}
/**
 * 分页组件的方法 - 当前页数
 * @param newPage 当前页数
 * @returns {void}
 */
const handleCurrentChangeFn = (newPage: number) => {
  console.log('分页组件的方法 - 当前页数');
  queryInfo.value.pagenum = newPage;
  queryFn()
}

/**
 * 组件挂载完成后调用
 * @returns {void}
 */
onMounted(() => {
  queryFn()
})

/**
 * 新增用户
 * @returns {void}
 */
const addUserInfoFn = () => {
  console.log('addUserInfoFn');
  DrawerTitle.value = '新增用户'
  isAddMode.value = 1
  drawerRef.value?.open()
}

/**
 * 删除用户
 * @param id 用户id
 * @returns {void}
 * */
const deleteFn = (id: any) => {
  if (id === 500) {
    ElNotification.error('该用户禁止删除!');
  } else {
    deleteUserApi(id).then(res => {
      if ((res as any).meta.status === 200) {
        ElNotification.success((res as any).meta.msg)
      } else {
        ElNotification.error((res as any).meta.msg)
      }
      getUserListFn('')
    })
  }
}

/**
 * 多选框选中的用户id数组
 * @param val 选中的用户id数组
 * @returns {void}
 */
const multipleSelectChangeFn = (val: any) => {
  console.log('multipleSelectChangeFn', val);
  // const arr = ref([])
  // val.map(item => {
  //   arr.value.push(item.id)
  // })
  // console.log(arr.value);
  // deleteUserInfoFn(arr)
}

/**
 *  批量删除用户
 * @returns {void}
 * @param adminId
 * @param roleId
 */
// const deleteUserInfoFn = (params) => {
//   console.log('deleteUserInfoFn');
//   batchDeleteAPI(params).then(res => {
//     if ((res as any).meta.status === 200) {
//       ElNotification.success((res as any).meta.msg)
//     } else {
//       ElNotification.error((res as any).meta.msg)
//     }
//     getUserListFn()
//   })
// }

/**
 * 权限分配
 * @param adminId
 * @param roleId
 */

const assignUserRoleFn = (adminId: any, roleId: any) => {
  console.log('assignUserRoleFn', adminId, roleId);
  assignUserRoleApi(adminId.id, roleId).then(res => {
    if ((res as any).meta.status === 200) {
      ElNotification.success((res as any).meta.msg)
      userInfo.value.role_name = ''
      userInfo.value.role_id = ''
      selectedRolesId.value = ''
      drawerRef.value?.close()
    } else {
      ElNotification.error((res as any).meta.msg)
    }
    getUserListFn('')
  })
}

/**
 * 抽屉组件的方法 - 确认按钮
 * @returns {void}
 */
const submitFn = () => {
  if (isAddMode.value === 1) {
    console.log('新增用户');
    if (!ruleFormRef.value) {
      ElNotification.error('添加用户的表单校验失败!');
      return;
    }
    if (ruleFormRef.value) ruleFormRef.value.validate((valid: any) => {
      if (valid) {
        addUserApi(addFromData.value).then(res => {
          if ((res as any).meta.status === 201) {
            ElNotification.success((res as any).meta.msg)
            addFromData.value = {
              username: '',
              password: '',
              email: '',
              mobile: ''
            }
            drawerRef.value?.close()
          } else {
            ElNotification.error((res as any).meta.msg)
          }
          getUserListFn('')
        })
      } else {
        ElNotification.error('添加用户的表单校验失败!');
      }
    })
  } else if (isAddMode.value === 2) {
    console.log('修改用户');
    updateUserInfoFn()
  } else if (isAddMode.value === 3) {
    console.log('分配角色');
    if (!selectedRolesId) {
      ElNotification.error('请选择角色!');
    } else {
      console.log(selectedRolesId.value, "selectedRolesId.value");
      assignUserRoleFn(userInfo.value, selectedRolesId.value)
    }
  }
}

/**
 * 抽屉组件的方法 - 取消按钮
 * @returns {void}
 */
const cancelFn = () => {
  console.log('这是在父组件定义的方法，子组件触发了');
  if (isAddMode.value === 1) {
    addFromData.value = {
      username: '',
      password: '',
      email: '',
      mobile: ''
    }
  } else if (isAddMode.value === 3) {
    selectedRolesId.value = ''
  }
  drawerRef.value?.close()
}

/**
 * 编辑用户
 * @param row 用户信息
 * @returns {void}
 */
const editFn = (row: any) => {
  console.log('editFn', row);
  if (row.id === 500) {
    ElNotification.error('该用户禁止修改!');
  } else {
    DrawerTitle.value = '编辑用户'
    getUserInfoApi(row.id).then(res => {
      if ((res as any).meta.status === 200) {
        editFromData.value = res.data
        isAddMode.value = 2
        drawerRef.value?.open()
      } else {
        ElNotification.error((res as any).meta.msg)
      }
    })
  }
}

/**
 * 更新用户信息
 * @returns {void}
 */
const updateUserInfoFn = () => {
  if (!editFormRef.value) {
    ElNotification.error('更新用户的表单校验失败!');
  }
  if (editFormRef.value) editFormRef.value.validate((valid: any) => {
    if (valid) {
      updateUserInfoApi(editFromData.value).then(res => {
        if ((res as any).meta.status === 200) {
          ElNotification.success((res as any).meta.msg)
          editFromData.value = {
            username: '',
            email: '',
            mobile: ''
          }
          drawerRef.value?.close()
        } else {
          ElNotification.error((res as any).meta.msg)
        }
        getUserListFn('')
      })
    } else {
      ElNotification.error('更新用户的表单校验失败!');
    }
  })
}

/**
 * 分配角色
 * @returns {void}
 * @param row
 */
const settingFn = (row: any) => {
  console.log('settingFn', row);
  DrawerTitle.value = '分配角色'
  isAddMode.value = 3
  getuserRoleFn()
  userInfo.value = row
  drawerRef.value?.open()
}
/**
 * 获取用户的角色列表
 * @returns {void}
 */
const getuserRoleFn = () => {
  getUserRoleApi().then(res => {
    if ((res as any).meta.status === 200) {
      roleseList.value = res.data
    } else {
      ElNotification.error((res as any).meta.msg)
    }
  })
}
</script>

<style lang="scss" scoped>
.scroll-card {
  margin-top: 1rem;
  height: calc(100% - 2rem);
  /* 设置一个固定高度 */
  background-color: #a9efe7;
  border-radius: 10px;
  border: none;
  overflow: auto;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
}

.aClass {
  color: #409EFF;
  cursor: pointer;
  text-decoration: underline
}
</style>
