<!--
* @Author: GZF
* @Date: 2024-11-12 00:33:57
* @Description: 首页 = welcome页面
-->
<template>
  <div style="height: 100%;">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/home' }">/ 首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="scroll-card">
      <!-- <img src="../../assets//images/bgImage.webp" alt="首页"> -->
    </el-card>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.scroll-card {
  margin-top: 1rem;
  height: calc(100% - 2rem);
  /* 设置一个固定高度 */
  overflow: auto;
  width: 100%;
  background-image: url('@/assets/images/bgImage.webp');
  background-size: 100% 100%;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
