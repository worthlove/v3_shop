<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" size="450px" title="列设置">
    <div class="table-main">
      <el-table :border="true" :data="colSetting" :tree-props="{ children: '_children' }" default-expand-all
                row-key="prop">
        <el-table-column align="center" label="列名" prop="label"/>
        <el-table-column v-slot="scope" align="center" label="显示" prop="isShow">
          <el-switch v-model="scope.row.isShow"></el-switch>
        </el-table-column>
        <el-table-column v-slot="scope" align="center" label="排序" prop="sortable">
          <el-switch v-model="scope.row.sortable"></el-switch>
        </el-table-column>
        <template #empty>
          <div class="table-empty">
            <img alt="notData" src="@/assets/images/notData.png"/>
            <div>暂无可配置列</div>
          </div>
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import {ColumnProps} from "../interface";

defineProps<{ colSetting: ColumnProps[] }>();

const drawerVisible = ref<boolean>(false);

const openColSetting = () => {
  drawerVisible.value = true;
};

defineExpose({
  openColSetting
});
</script>

<style lang="scss" scoped>
.cursor-move {
  cursor: move;
}
</style>
