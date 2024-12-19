<template>
  <div class="not-container">
    <img alt="403" class="not-img" src="@/assets/images/403.png"/>
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
      <el-button type="primary" @click="router.back"> 返回上一页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
</script>

<style lang="scss" scoped>
@import "@/components/errorMessage/index.scss";
</style>
