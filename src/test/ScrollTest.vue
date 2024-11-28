<template>
  <div style="width:100%">
    <!-- 定义一个返回顶部的按钮，当点击时调用 scrollToTop 方法 -->
    <div :style="{ top: showBackToTop? '-200px' : '-999px' }"
         class="back-to-top cd-top faa-float animated cd-is-visible"
         @click="scrollToTop">123123
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';

// 定义一个 ref 来控制返回顶部按钮的显示和隐藏
const showBackToTop = ref(false);

// 在组件挂载后，监听 window 的 scroll 事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 定义一个方法来处理滚动事件
function handleScroll() {
  // 获取当前滚动的距离
  const scrollYHeight = window.scrollY;
  // 如果滚动距离大于 500px，则显示返回顶部按钮
  showBackToTop.value = scrollYHeight > 500;
}

// 定义一个方法，当点击返回顶部按钮时，平滑地滚动到页面顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<style lang="scss" scoped>
// 引入外部的 less 文件
@import "@/test/scrollTop";
</style>
