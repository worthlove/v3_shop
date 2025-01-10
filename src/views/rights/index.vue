<template>
  <div style="height:100%">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="homeRoute">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="rightsRoute">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="scroll-card">
      <el-card>
        <MTable ref="elTableRef" :index-method="indexMethods" :label-list="TableLabel" :resizable=false
          :table-data="tableData" border class="elTables" size="default" style="height: 38.626rem" table-size="small">
        </MTable>
      </el-card>
    </el-card>
  </div>
</template>

<script lang="tsx" setup>
import {RouteLocationRaw} from 'vue-router';
import MTable from '@/components/table/m-table/mTable.vue';
import {getRightApi} from "@/api/rightApi";
import {ElNotification} from "element-plus";

const homeRoute: RouteLocationRaw = ({path: '/home'})
const rightsRoute: RouteLocationRaw = ({path: '/rights'})

const indexMethods = computed(() => {
  return (index: number): number => {
    return index + 1
  }
})

const TableLabel = [
  {
    type: 'index',
    fixed: 'left',
    label: "#",
  }, {
    label: '权限名称',
    prop: 'authName',
  }, {
    label: '路径',
    prop: 'path'
  }, {
    label: '权限等级',
    prop: 'level',
    render: (scope: any) => {
      return (
          <>
            <el-tag
                type={scope.row.level === '0' ? 'primary' : scope.row.level === '1' ? 'success' : 'warning'}>
              {scope.row.level === '0' ? '一级权限' : scope.row.level === '1' ? '二级权限' : '三级权限'}
            </el-tag>
          </>
      )
    }
  }
]

const tableData = ref([])

const elTableRef = ref()

onMounted(() => {
  getRightsFn()
})

const getRightsFn = () => {
  getRightApi().then((res:any) => {
    if (res.meta.status !== 200) {
      ElNotification({
        title: '获取权限列表失败',
        message: res.meta.msg,
        type: 'error',
        duration: 2000
      })
    } else {
      tableData.value = res.data
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
</style>
