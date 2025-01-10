<template>
  <el-table ref="'tableRef'+condition.TableIndex" :data="tableData" :header-cell-style="{
      background: '#f5f7fa',color: '#303133','text-align': 'center'}" :resizeable="resizable" :size="tableSize" border
    fit header-algin="center" height="100%" highlight-current-row tooltip-effect="dark" width="100%"
    @select="handleSelect" @selection-change="handleSelectionChange" @sort-change="handleSortChange"
    @cell-click="handleCellClick">
    <template v-if="labelList && labelList.length > 0">
      <template v-for="(item, index) in labelList" :key="index">

        <template v-if="item.type == 'expand'">
          <el-table-column :fixed="item.fixed" :label="item.label" :width="item.width" type="expand">
            <template v-if="item.render" #default="props">
              <component :is="item.render" v-if="item.render" v-bind="props" />
              <slot v-else :name="item.type" v-bind="props" />
            </template>
          </el-table-column>
        </template>

        <template v-else-if="item.selection && item.selection === 'checkedBox'">
          <el-table-column :key="index" :fixed="item.fixed" align="center" type="selection"
            width="50px"></el-table-column>
        </template>

        <template v-else-if="item.selection && item.selection === 'radio'">
          <el-table-column :key="index" :fixed="item.fixed" align="center" class-name="radio_selection" labelwidth="50">
            <template v-slot="scope">
              <el-radio v-model="checkedRadio" :label="scope.row.id" @change="() => handleSingleSelectChange(scope.row)"
                @click="() => handleSingleSelectClick(scope.row, scope.row.id, scope.$index)">{{ '' }}
              </el-radio>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="item.type === 'index'">
          <el-table-column :key="index" :fixed="item.fixed" :index="indexMethod" :label="item.label || '序号'"
            align="center" type="index" with="65px"></el-table-column>
        </template>

        <el-table-column v-else :align="item.align" :fixed="item.fixed" :label="item.label" :prop="item.prop"
          :show-overflow-tooltip="item.showOverflowTooltip" :sortable="item.sortable" :width="item.width">
          <template #default="scope">
            <span :class="typeof item.class === 'function' ? item.class(scope.row) : item.class"
              @click="() => item.click?.(scope.row)">
              <template v-if="item.transfer">
                {{ item.transfer(scope.row) }}
              </template>

              <template v-else-if="item.render">
                <component :is="item.render" v-if="item.render" v-bind="scope" />
              </template>

              <template v-else>
                {{ scope.row[item.prop as keyof typeof scope.row] || '--' }}
              </template>
            </span>
          </template>

          <template v-if="item.headerRender && item.headerRender === true" #header>
            <!--<el-tag type="primary">{{ item.label }}</el-tag>-->
            <el-button :style="item.headerStyle" round size="small" type="primary">
              {{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script lang="ts">
import {ElTable, ElMessage} from 'element-plus';
import {LabelItem} from './interface.ts';

export default defineComponent({
  name: 'ElTables',
  methods: {ElMessage},
  props: {
    /**
     * 表格数据
     * @default []
     * @type {Array}
     */
    tableData: {
      type: Array,
      default: () => [],
    },
    /**
     * 表格列
     * @default []
     * @type {Array}
     */
    labelList: {
      type: Array as () => LabelItem[],
      required: true,
      default: () => [],
    },
    /**
     * 单选 | 多选
     * @default ''
     * @type {string}
     * @default '' | 'checkedBox' | 'radio'
     */
    checkedRadio: {
      type: String,
      default: '',
    },
    /**
     * 表格索引
     * @default 0
     * @type {number}
     */
    indexMethod: {
      type: Function,
    },
    /**
     * 多选
     * @default []
     * @type {Array}
     */
    selectItem: {
      type: Array,
      default: () => []
    },
    /**
     * 表格大小
     * @default small | default | large
     * @type {string}
     */
    tableSize: {
      type: String,
      default: 'small',
    },
    /**
     * 表格是否可调整列宽
     * @default false
     * @type {boolean}
     */
     resizable: {
      type: Boolean,
      default: false,
    },
    /**
     * 表格是否显示溢出
     * @default false
     * @type {boolean}
     */
    showOverflowTooltip: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'sortChange',
    'mulTipSelect',
    'mulTipSelectChange',
    'multipleSelectChange',
    'singleSelectChange',
    'singleSelectClick',
    'cellClick',
  ],
  setup(props, {emit}) {
    const tableRef = ref<InstanceType<typeof ElTable>>();
    const condition = reactive({TableIndex: Math.random() * 999});

    const toggleSelection = (rows?: any[]) => {
      if (rows) {
        rows.forEach((row) => {
          tableRef.value?.toggleRowSelection(row);
        });
      } else {
        tableRef.value?.clearSelection();
      }
    };

    const handleSortChange = (sortVal: any) => emit('sortChange', sortVal);
    const handleSelect = (rows: any[], row: any) => emit('mulTipSelect', rows, row);
    const handleSelectionChange = (rows: any[]) => emit('multipleSelectChange', rows);
    const handleSelectChange = (rows: any[]) => emit('mulTipSelectChange', rows);
    const handleSingleSelectChange = (row: any) => emit('singleSelectChange', row);
    const handleSingleSelectClick = (row: any, id: string, index: number) => emit('singleSelectClick', row, id, index);
    const handleCellClick = (row: any) => emit('cellClick', row);

    watch(
        () => props.labelList,
        () => {
          tableRef.value?.doLayout();
        },
        {immediate: true},
    );

    return {
      condition,
      tableRef,
      toggleSelection,
      handleSortChange,
      handleSelect,
      handleSelectChange,
      handleSelectionChange,
      handleSingleSelectChange,
      handleSingleSelectClick,
      handleCellClick,
    };
  },
});
</script>
<style lang='scss' scoped>
//:deep(.el-table__body-wrapper .el-scrollbar__thumb) {
//  background-color: #49aaec;
//}
//
//:deep(.el-table__body-wrapper .el-scrollbar__bar) {
//  background-color: #d2e2ed;
//}

// ----------修改elementplus表格的默认样式-----------
.el-table__body-wrapper {
  &::-webkit-scrollbar {
    // 整个滚动条
    width: 0; // 纵向滚动条的宽度
    background: #409EFF;
    border: none;
  }

  &::-webkit-scrollbar-track {
    // 滚动条轨道
    border: none;
  }
}

// --------------------隐藏table gutter列和内容区右侧的空白 start
.el-table th.gutter {
  display: none;
  width: 0;
}

.el-table colgroup col[name='gutter'] {
  display: none;
  width: 0;
}

.el-table__body {
  width: 100% !important;
}
</style>
