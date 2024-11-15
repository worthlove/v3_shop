<!--
* @Author: GZF
* @Date: 2024-11-12 00:33:57
* @Description: 首页 = welcome页面
-->
<template>
  <div class="welcome">
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 450" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.welcome {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
