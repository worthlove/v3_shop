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
                  <el-button :icon="Search" @click="queryFn"/>
                </template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="box-item" content="点击此按钮,弹出页面进行用户添加" effect="dark"
                          placement="right-start">
                <el-button plain type="primary">添加用户</el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <MTable ref="elTablesRef" :index-method="indexMethods" :labelList="TableLabel" :tableData="tableData" border
                class="elTables"></MTable>
      </el-card>
    </el-card>
  </div>
</template>

<script lang="tsx" setup>
import {Search} from '@element-plus/icons-vue'
import {ref, computed, onMounted,} from 'vue'
import MTable from "@/components/table/m-table/mTable.vue";
import {userListApi} from "@/api/usersApi/usersApi.ts";

const queryInfo = ref({
  query: '',
  // 当前页数
  pageNum: 1,
  // 当前页面显示多少条数据
  pageSize: 10
})

// 示例数据
let tableData = ref([])

const TableLabel = [
  {type: 'selection', selection: 'checkedBox'},
  {type: 'index'},
  {
    label: '姓名',
    prop: 'username',
    align: 'center',
    jsx: (row) => {
      return (
          <a
              style="color:#409EFF;cursor:pointer;text-decoration:underline"
              onClick={() => {
                this.tablePerPorFn(row)
              }}
          >
            {row.PerPor}
          </a>
      )
    }
  }, {
    label: '邮箱',
    prop: 'email',
    align: 'center'
  }, {
    label: '电话',
    prop: 'mobile',
    align: 'center'
  }, {
    label: '角色',
    prop: 'role_name',
    align: 'center'
  }, {
    label: '状态',
    prop: 'state',
    align: 'center'
  }, {
    label: '操作',
    prop: 'caoZuo',
    align: 'center'
  }
]

const getUserListFn = (query: string) => {
  console.log(query)
}

const queryFn = () => {
  let queryInfo = {
    pagenum: 1,
    pagesize: 10,
    query: ''
  }
  userListApi(queryInfo).then(res => {
    if (res.meta.status === 200) {
      // 直接赋值数组
      tableData.value = res.data.users?.map((user: any) => ({
        username: user.username || '',
        email: user.email || '',
        mobile: user.mobile || '',
        role_name: user.role_name || '',
        state: user.state ?? false,
        vip: user.vip ?? false
      })) || []
      console.log('tableData updated:', tableData.value)
      // total = res.data.total
    }
  })
}

// 列表序号
const indexMethods = computed(() => {
  return (index: number): number => {
    return (queryInfo.value.pageNum - 1) * queryInfo.value.pageSize + index + 1
  }
})
// 页面加载时获取数据
onMounted(() => {
  queryFn()
})
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
