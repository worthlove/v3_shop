<template>
  <div class="card filter">
    <h4 v-if="title" class="title sle">
      {{ title }}
    </h4>
    <div class="search">
      <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤" />
      <el-dropdown trigger="click">
        <el-icon size="20">
          <More />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toggleTreeNodes(true)">展开全部</el-dropdown-item>
            <el-dropdown-item @click="toggleTreeNodes(false)">折叠全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree ref="treeRef" :check-on-click-node="multiple" :check-strictly="false"
        :current-node-key="!multiple ? selected : ''" :data="multiple ? treeData : treeAllData"
        :default-checked-keys="multiple ? selected : []" :expand-on-click-node="false" :filter-node-method="filterNode"
        :highlight-current="!multiple" :node-key="id" :props="defaultProps" :show-checkbox="multiple" default-expand-all
        @check="handleCheckChange" @node-click="handleNodeClick">
        <template #default="scope">
          <span class="el-tree-node__label">
            <slot :row="scope">
              {{ scope.node.label }}
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch, onBeforeMount, nextTick} from "vue";
import {ElTree} from "element-plus";
import {More} from "@element-plus/icons-vue";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
  requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  title?: string; // treeFilter 标题 ==> 非必传
  id?: string; // 选择的id ==> 非必传，默认为 “id”
  label?: string; // 显示的label ==> 非必传，默认为 “label”
  multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
  defaultValue?: any; // 默认选中的值 ==> 非必传
}

const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: "id",
  label: "label",
  multiple: false
});

const defaultProps = {
  children: "children",
  label: props.label
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();

const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
  else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
  setSelected();
  if (props.requestApi) {
    const {data} = await props.requestApi!();
    treeData.value = data;
    treeAllData.value = [{id: "", [props.label]: "全部"}, ...data];
  }
});

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
    () => props.defaultValue,
    () => nextTick(() => setSelected()),
    {deep: true, immediate: true}
);

watch(
    () => props.data,
    () => {
      if (props.data?.length) {
        treeData.value = props.data;
        treeAllData.value = [{id: "", [props.label]: "全部"}, ...props.data];
      }
    },
    {deep: true, immediate: true}
);

const filterText = ref("");
watch(filterText, val => {
  treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true;
  console.log(value, data, node);
  let parentNode = node.parent,
      labels = [node.label],
      level = 1;
  while (level < node.level) {
    labels = [...labels, parentNode.label];
    parentNode = parentNode.parent;
    level++;
  }
  return labels.some(label => label.indexOf(value) !== -1);
};

// 切换树节点的展开或折叠状态
const toggleTreeNodes = (isExpand: boolean) => {
  let nodes = treeRef.value?.store.nodesMap;
  if (!nodes) return;
  for (const node in nodes) {
    if (nodes.hasOwnProperty(node)) {
      nodes[node].expanded = isExpand;
    }
  }
};

// emit
const emit = defineEmits<{
  change: [value: any];
}>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return;
  emit("change", data[props.id]);
};

// 多选
const handleCheckChange = () => {
  emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({treeData, treeAllData, treeRef});
</script>

<style lang="scss" scoped>
.filter {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 18px;
  margin-right: 10px;

  .title {
    margin: 0 0 15px;
    font-size: 18px;
    font-weight: bold;
    color: var(--el-color-info-dark-2);
    letter-spacing: 0.5px;
  }

  .search {
    display: flex;
    align-items: center;
    margin: 0 0 15px;

    .el-icon {
      cursor: pointer;
      transform: rotate(90deg) translateY(-8px);
    }
  }

  .el-scrollbar {
    :deep(.el-tree) {
      height: 80%;
      overflow: auto;

      .el-tree-node__content {
        height: 33px;
      }
    }

    :deep(.el-tree--highlight-current) {
      .el-tree-node.is-current>.el-tree-node__content {
        background-color: var(--el-color-primary);

        .el-tree-node__label,
        .el-tree-node__expand-icon {
          color: white;
        }

        .is-leaf {
          color: transparent;
        }
      }
    }
  }
}
</style>
