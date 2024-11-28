<template>
  <el-table
      ref="'tableRef'+condition.TableIndex"
      :data="tableData"
      :header-cell-style="{
      background: '#4FAEEF',color: '#C1DEF3','text-align': 'center'}"
      :resizeable="false"
      border
      fit
      header-algin="center"
      height="100%"
      highlight-current-row
      size="small"
      tooltip-effect="dark"
      width="100%"
      @select="handleSelect"
      @sort-change="handleSortChange"
      @cell-click="handleCellClick"
  >
    <template v-if="labelList && labelList.length > 0">
      <template v-for="(item, index) in labelList" :key="index">

        <template v-if="item.selection && item.selection === 'checkedBox'">
          <el-table-column :key="index" align="center" type="selection" width="50px"></el-table-column>
        </template>
        <template v-else-if="item.selection && item.selection === 'radio'">
          <el-table-column
              :key="index"
              align="center"
              class-name="radio_selection"
              label
              width="50"
          >
            <template v-slot="scope">
              <el-radio
                  v-model="checkedRadio"
                  :label="scope.row.id"
                  @change="() => handleSingleSelectChange(scope.row)"
                  @click="() => handleSingleSelectClick(scope.row, scope.row.id, scope.$index)"
              >{{ '' }}
              </el-radio>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'index'">
          <el-table-column
              :key="index"
              :index="indexMethod"
              align="center"
              label="序号"
              type="index"
              with="65px"
          ></el-table-column>
        </template>
        <el-table-column
            v-else
            :align="item.align"
            :label="item.label"
            :prop="item.prop"
            :sortable="item.sortable"
            :width="item.width"
        >
          <template #default="scope">
          <span
              :class="typeof item.class === 'function' ? item.class(scope.row) : item.class"
              @click="() => item.click?.(scope.row)"
          >
            <template v-if="item.transfer">
              {{ item.transfer(scope.row) }}
            </template>
            <template v-else-if="item.xhtml">
              <div v-html="item.xhtml(scope.row)"/>
            </template>

            <template v-else-if="item.render">
                  {{ item.render(scope.row) }}
            </template>

            <template v-else>
              {{ scope.row[item.prop] || '--' }}
            </template>
          </span>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from 'vue';
import {ElTable, ElTableColumn, ElRadio} from 'element-plus';

export default defineComponent({
  name: 'ElTables',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    labelList: {
      type: Array,
      required: true,
    },
    checkedRadio: {
      type: String,
      default: '',
    },
    indexMethod: {
      type: Function,
    },
    selectItem: {
      type: Array,
      default: () => []
    },
  },
  emits: [
    'sortChange',
    'mulTipSelect',
    'mulTipSelectChange',
    'singleSelectChange',
    'singleSelectClick',
    'cellClick',
  ],
  setup(props, {emit}) {
    const tableRef = ref();
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
      tableRef,
      toggleSelection,
      handleSortChange,
      handleSelect,
      handleSelectChange,
      handleSingleSelectChange,
      handleSingleSelectClick,
      handleCellClick,
    };
  },
});
</script>
<style lang='scss' scoped>
// ----------修改elementplus表格的默认样式-----------
.el-table__body-wrapper {
  &::-webkit-scrollbar {
    // 整个滚动条
    width: 0; // 纵向滚动条的宽度
    background: rgba(213, 215, 220, 0.3);
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

// --------------------隐藏table gutter列和内容区右侧的空白 end
</style>

