<template>
  <div>
    <el-drawer v-model="drawer" :close-on-click-modal=false :close-on-press-escape=false :direction="direction" :size="size"
               :title="title" custom-class="custom-drawer">
      <el-card class="drawer-card">
        <slot name="DrawerBody"></slot>
      </el-card>
      <el-card class="classCard">
        <el-button type="primary" @click="submit">{{ conText }}</el-button>
        <el-button type="info" @click="cancel">{{ conText1 }}</el-button>
      </el-card>
    </el-drawer>
  </div>
</template>

<script setup>
import {ref} from "vue"

const drawer = ref(false)

const open = () => drawer.value = true
const close = () => drawer.value = false

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  direction: {
    type: String,
    default: 'rtl'
  },
  conText: {
    type: String,
    default: '测试'
  },
  conText1: {
    type: String,
    default: '测试'
  }
})

const emit = defineEmits(['submit', 'cancel'])
const submit = () => emit('submit')
const cancel = () => emit('cancel')

defineExpose({
  open,
  close
})

</script>

<style lang="scss" scoped>
:deep(.el-drawer .el-drawer__header) {
  padding: 16px 20px;
  margin-bottom: 0;
  border-bottom: 2px solid #5a8a9aee;
  background-color: #55cfea;
}

:deep(.el-drawer__title) {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

:deep(.el-drawer__close) {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

:deep(.el-drawer__body) {
  padding: 10px;
  background-color: #74a7e8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}

.drawer-card {
  height: calc(100% - 5.5rem);
  /* 设置一个固定高度 */
  background-color: #a9efe7;
  border-radius: 0;
  border: none;
  overflow: auto;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
}

.classCard {
  background-color: #a9efe7;
  border-radius: 0;
  border: none;
  overflow: auto;
  display: flex;
  justify-content: flex-end;
}
</style>
