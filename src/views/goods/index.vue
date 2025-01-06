<template>
  <div style="height: 100%">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="homeRoute">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="goodsRoute">商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="scroll-card">
      <el-card style="margin-bottom: 1rem;">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="queryInfo.query" clearable placeholder="请输入要搜索的商品名称" @clear='getProDuctFn'>
                <template #append>
                  <el-button icon="Search" @click="queryFn" />
                </template>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="box-item" content="点击此按钮,弹出页面进行商品添加" effect="dark" placement="right-start">
                <el-button plain type="primary" @click="addProductFn">添加商品</el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <MTable ref="elTableRef" :index-method="indexMethods" :label-list="TableLabel" :resizeable=false
          :table-data="tableData" border class="elTables" size="default" style="height: 30rem" table-size="small">
        </MTable>
        <el-pagination :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" :page-sizes="[1, 5, 10, 15]"
          :total="total" background layout="->, total,sizes, prev, pager, next, jumper" size="small"
          style="margin-top: 1rem;" @size-change="handleSizeChangeFn"
          @current-change="handleCurrentChangeFn"></el-pagination>
      </el-card>
    </el-card>
  </div>
</template>

<script lang="tsx" setup>
import {RouteLocationRaw} from "vue-router";
import MTable from '@/components/table/m-table/mTable.vue';

const homeRoute: RouteLocationRaw = ({path: '/home'})
const goodsRoute: RouteLocationRaw = ({path: '/goods'})

const queryInfo = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10,
})

const queryFn = () => {
  console.log('查询商品列表');
}

const getProDuctFn = () => {
  console.log('清空搜索框,并重新获取商品列表');
}

const addProductFn = () => {
  console.log('添加商品');
}

/**
 * 表格的方法 - 序号
 * @returns {function}
 */
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
    label: '商品名称',
    prop: 'goods_name',
    align: 'left',
    showOverflowTooltip: true,
  }, {
    label: '商品价格（元）',
    prop: 'goods_price',
    align: 'center',
    width: 130,
  }, {
    label: '商品质量',
    prop: 'goods_weight',
    align: 'center',
    width: 100,
  },
  {
    label: '创建时间',
    prop: 'add_time',
    align: 'center',
    width: 200,
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    fixed: 'right',
    width: 250,
    // render: (scope: any) => {
    //   return (
    //       <>
    //         <el-button icon={<Edit/>} plain type="primary" size="default">编辑</el-button>
    //         <el-button icon={<Delete/>} plain type="danger" size="default">删除</el-button>
    //       </>
    //   )
    // }
  }
]
const tableData = ref([])

const total = ref(0)

/**
 * 分页组件的方法 - 每页显示多少条数据
 * @param newSize 每页显示多少条数据
 * @returns {void}
 */
const handleSizeChangeFn = (newSize: number) => {
  console.log('分页组件的方法 - 每页显示多少条数据');
  queryInfo.pagenum = 1;
  queryInfo.pagesize = newSize;
  queryFn()
}
/**
 * 分页组件的方法 - 当前页数
 * @param newPage 当前页数
 * @returns {void}
 */
const handleCurrentChangeFn = (newPage: number) => {
  console.log('分页组件的方法 - 当前页数');
  queryInfo.pagenum = newPage;
  queryFn()
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
