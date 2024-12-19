<!--
* @Author: GZF
* @Date: 2024-12-12 19:51:10
* @Description: roles 页面
-->
<template>
  <div style="height:100%">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/rights' }">权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="scroll-card">
      <el-card style="margin-bottom: 1rem">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-tooltip class="box-item" content="点击此按钮,弹出页面进行角色添加" effect="dark" placement="right-start">
                <el-button plain type="primary" @click="addRoleFn">添加角色</el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <MTable ref="elTablesRef" :index-method="indexMethods" :labelList="TableLabel" :resizeable=true
          :tableData="tableData" border class="elTables" size="default" style="height: 28.626rem" tableSize="small">
        </MTable>
      </el-card>
    </el-card>
    <drawer ref="drawerRef" :title="DrawerTitle" conText="确认" conText1="取消" direction="rtl" size="40%"
      @cancel="cancelFn" @submit="submitFn">
      <template #DrawerBody>
        <!-- 新增用户所需表单 -->
        <el-form v-if="isAddMode === 1" ref='ruleFormRef' :model='addFromData' :rules='addFromRules' label-width='90px'>
          <el-form-item label='角色名称' prop='roleName'>
            <el-input v-model='addFromData.roleName'></el-input>

          </el-form-item>
          <el-form-item label='角色名描述' prop='roleDesc'>
            <el-input v-model='addFromData.roleDesc'></el-input>
          </el-form-item>
        </el-form>
        <el-form v-if="isAddMode === 2" ref='EditFormRef' :model='editFromData' :rules='editFromRules'
          label-width='90px'>
          <el-form-item label='角色名称' prop='roleName'>
            <el-input v-model='editFromData.roleName'></el-input>
          </el-form-item>
          <el-form-item label='角色描述' prop='roleDesc'>
            <el-input v-model='editFromData.roleDesc'></el-input>
          </el-form-item>
        </el-form>
        <TreeFilter v-if="isAddMode === 3" ref="treeFilterRef" :data="treeFilterData"
          :default-value="initParam.departmentId" :request-api="getRoleListApi" label="authName" multiple title="权限树🌲"
          @change="changeTreeFilter" />
      </template>
    </drawer>
  </div>
</template>

<script lang="tsx" setup>
import {ElButton, ElRow, ElCol, ElTag, ElMessageBox} from 'element-plus';
import {Edit, Delete, Setting, CaretRight} from '@element-plus/icons-vue'
import {ref, computed, onMounted, reactive, nextTick} from 'vue'
import MTable from "@/components/table/m-table/mTable.vue";
import Drawer from '@/components/drawer/index.vue'
import {ElNotification, ElForm} from "element-plus";
import {
  getAllRoleListApi,
  getRoleIdApi,
  addRoleApi,
  updateRoleApi,
  deleteRoleApi,
  deleteRoleAuthApi,
  getRoleListApi
} from "@/api/authorityApi/index.ts";
import TreeFilter from "@/components/tree/index.vue";

// 获取默认选中的tree数据
const initParam = reactive({departmentId: []});

const treeFilterRef = ref(null);

// 获取的tree 数据
const treeFilterData = ref<any>([]);

// 选中tree数据的id
const changeTreeFilter = (data: any) => {
  console.log(data, '选中的节点id');
  initParam.departmentId = data;
}

// drawer 组件的引用
const drawerRef = ref(null)

// 新增用户所需表单 新增角色｜ 编辑用户所需表单 编辑角色 ｜ 角色分配所需表单 分配角色
const DrawerTitle = ref('新增角色')

// 新增用户所需表单 1｜ 编辑用户所需表单 2 ｜ 角色分配所需表单 3
const isAddMode = ref(1)

// 新增用户所需表单 校验规则
const ruleFormRef = ref<InstanceType<typeof ElForm> | null>(null)
// 编辑用户所需表单 校验规则
const EditFormRef = ref<InstanceType<typeof ElForm> | null>(null)

// 新增用户所需表单
const addFromData = ref({
  roleName: '',
  roleDesc: '',
  id: ''
})

// 新增用户所需表单 校验规则
const addFromRules = ref({
  roleName: [
    {required: true, message: '请输入角色名称', trigger: 'blur'}
  ]
})

// 编辑用户所需表单
const editFromData = ref({
  roleName: '',
  roleDesc: '',
  id: ''
})
// 编辑用户所需表单 校验规则
const editFromRules = ref({
  roleName: [
    {required: true, message: '请输入角色名称', trigger: 'blur'}
  ]
})

// 表格表头标签
const TableLabel = [
  {
    type: 'expand',
    width: 85,
    fixed: 'left',
    label: "Expand",
    render: (props: any) => { // 渲染函数
      if (!props.row.children) {
        // 如果 props.row.children 不存在，返回一个空数组
        return [];
      }
      return (
          <>
            {props.row.children.map((itemOne: any, iOne: number) => (
                <ElRow style={'border-bottom:1px solid #eee;display: flex;\n' +
                    '  align-items: center;'} key={itemOne.id}
                       class={[iOne === 0 ? 'dbTop' : '']}>
                  <ElCol span={4}>
                    <ElTag style={'margin:7px'} closable onClose={() => removeRightById(props.row, itemOne.id)}>
                      {itemOne.authName}
                    </ElTag>
                  </ElCol>
                  <el-col span={1}><CaretRight style={'width:30px'}/></el-col>
                  {/* 渲染二级和三级权限 */}
                  <ElCol span={19}>
                    {itemOne.children?.map((itemTwo: any, iTwo: number) => (
                        <ElRow key={itemTwo.id} style={'display: flex;align-items: center;'}
                               class={[iTwo === 0 ? '' : 'dbTop',]}>
                          <ElCol span={5}>
                            <ElTag style={'margin:7px'} closable type="success"
                                   onClose={() => removeRightById(props.row, itemTwo.id)}>{itemTwo.authName}</ElTag>
                          </ElCol>
                          <el-col span={1}><CaretRight style={'width:30px'}/></el-col>
                          <ElCol span={18}>
                            {itemTwo.children?.map((itemThree: any) => (
                                <ElTag style={'margin:7px'} key={itemThree.id} closable type="warning"
                                       onClose={() => removeRightById(props.row, itemThree.id)}>{itemThree.authName}</ElTag>
                            ))}
                          </ElCol>
                        </ElRow>
                    ))}
                  </ElCol>
                </ElRow>
            ))}
          </>
      )
    } // 渲染函数
  },
  {type: 'index', fixed: 'left', label: "#",},
  {
    label: '角色名称',
    prop: 'roleName',
    align: 'center',
    fixed: 'left',
  },
  {
    label: '角色描述',
    prop: 'roleDesc',
    align: 'center',
    showOverflowTooltip: true,
    fixed: 'left',
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    fixed: 'right',
    width: 380,
    render: (scope: any) => {
      return (
          <>
            <el-tooltip class="box-item" content="编辑" effect="dark" placement="top">
              <el-button type="primary" icon={<Edit/>} onClick={() => editFn(scope.row)}>编辑
              </el-button>
              /
            </el-tooltip>
            <el-tooltip class="box-item" content="删除" effect="dark" placement="top">
              <el-button type="danger" icon={<Delete/>} onClick={() => deleteFn(scope.row)}>删除
              </el-button>
            </el-tooltip>
            <el-tooltip class="box-item" content="权限分配" effect="dark" placement="top">
              <el-button type="warning" icon={<Setting/>} onClick={() => authorityFn(scope.row)}>权限分配
              </el-button>
            </el-tooltip>
          </>
      )
    }
  },
]

// 表格数据
const tableData = ref([])

onMounted(() => {
  getRolesFn('ok')
})

// 表格序号
const indexMethods = computed(() => {
  return (index: number): number => {
    return index + 1
  }
})

// 获取角色信息列表数据
const getRolesFn = (type: string) => {
  getAllRoleListApi().then((res: any) => {
    if (res.meta.status !== 200) {
      if (type === 'ok') ElNotification.error('获取角色信息列表数据失败')
    } else {
      tableData.value = res.data
      if (type === 'ok') ElNotification.success('获取角色信息列表数据成功')
    }
  })
}

// 新增角色
const addRoleFn = () => {
  console.log('addRoleFn')
  isAddMode.value = 1
  DrawerTitle.value = '新增角色'
  drawerRef.value.open()
}

// 根据 ID 查询角色
const getRoleIdFn = (id: number) => {
  getRoleIdApi(id).then((res: any) => {
    if (res.meta.status !== 200) {
      ElNotification.error('根据 ID 查询角色失败')
    } else {
      ElNotification.success('根据 ID 查询角色成功')
    }
  })
}

// 编辑角色
const editFn = (row: any) => {
  console.log('editFn', row)
  isAddMode.value = 2
  DrawerTitle.value = '编辑角色'
  editFromData.value.roleName = row.roleName
  editFromData.value.roleDesc = row.roleDesc
  editFromData.value.id = row.id
  drawerRef.value.open()
}

// 删除角色
const deleteFn = (row: any) => {
  console.log('deleteFn', row)
  ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteRoleApi(row).then((res: any) => {
      if (res.meta.status !== 200) {
        ElNotification.error('删除角色失败')
      } else {
        ElNotification.success('删除角色成功')
      }
      getRolesFn('')
    })
  }).catch(() => {
    ElNotification.info('已取消删除')
  });
}
// 权限分配
const authorityFn = (row: any) => {
  console.log('authorityFn', row)
  isAddMode.value = 3
  DrawerTitle.value = '角色分配'
  // 获取权限树的默认选中的id
  nextTick(() => {
    const departmentId = getLeafKeys(row.children, [])
    console.log('departmentId', departmentId)
    if (treeFilterRef.value) {
      console.log(treeFilterRef.value.treeRef)
      treeFilterRef.value.treeRef.setCheckedKeys(departmentId, true)
    }
  })
  drawerRef.value.open()
}

// 获取叶子节点的 id 并返回 id 数组
const getLeafKeys = (data: any, result: any) => {
  data.forEach((item: any) => {
    if (item.children) {
      getLeafKeys(item.children, result);
    } else {
      result.push(item.id);
    }
  });
  return result;
}

// 确认
const submitFn = () => {
  if (isAddMode.value === 1) {
    if (!ruleFormRef.value) {
      ElNotification.error('添加用户的表单校验失败!');
      return;
    }
    ruleFormRef.value.validate((valid: any) => {
      if (valid) {
        console.log('添加用户的表单校验成功!');
        addRoleApi(addFromData.value).then((res: any) => {
          if (res.meta.status !== 201) {
            ElNotification.error('添加角色失败')
          } else {
            ElNotification.success('添加角色成功')
            drawerRef.value.close()
          }
          getRolesFn('')
        })
      } else {
        console.log('添加用户的表单校验失败!');
        return;
      }
    });
  } else if (isAddMode.value === 2) {
    if (!EditFormRef.value) {
      ElNotification.error('编辑用户的表单校验失败!');
    }
    if (EditFormRef.value) EditFormRef.value.validate((valid: any) => {
      if (valid) {
        console.log('编辑用户的表单校验成功!', editFromData.value);
        updateRoleApi(editFromData.value).then((res: any) => {
          if (res.meta.status !== 200) {
            ElNotification.error('编辑角色信息失败')
          } else {
            ElNotification.success('编辑角色信息成功')
            editFromData.value.roleDesc = ''
            editFromData.value.id = ''
            editFromData.value.roleName = ''
            drawerRef.value.close()
          }
          getRolesFn('')
        })
      } else {
        ElNotification.error('编辑用户的表单校验失败!');
        return;
      }
    });
  } else if (isAddMode.value === 3) {
    console.log('角色分配')
  }
}
// 取消
const cancelFn = () => {
  if (isAddMode.value === 1) {
    addFromData.value.roleName = ''
    addFromData.value.id = ''
    addFromData.value.roleDesc = ''
  } else if (isAddMode.value === 2) {
    editFromData.value.roleName = ''
    editFromData.value.id = ''
    editFromData.value.roleDesc = ''
  } else if (isAddMode.value === 3) {
    console.log('角色分配')
  }
  drawerRef.value.close()
}

const removeRightById = (row: any, id: number) => {
  ElMessageBox.confirm('此操作将永久删除该用户的权限,是否继续', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteRoleAuthApi(row, id).then((res: any) => {
      if (res.meta.status !== 200) {
        ElNotification.error('删除用户权限失败')
      } else {
        ElNotification.success('删除用户权限成功')
      }
      row.children = res.data
    })
  }).catch(() => {
    ElNotification.info('已取消删除')
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

el-tag {
  margin: 7px;
}

.dbBottom {
  border-bottom: 1px solid #EEE;
}

.dbTop {
  border-top: 1px solid #EEE;
}

.vCenter {
  display: flex;
  align-items: center;
}
</style>
