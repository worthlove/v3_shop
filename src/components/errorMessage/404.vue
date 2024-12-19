<template>
  <div class="not-container">
    <!--<img alt="404" class="not-img" src="@/assets/images/404.png"/>-->
    <div id="lottie404" class="not-img"></div>
    <div class="not-detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
      <el-button type="primary" @click="router.back"> 返回上一页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import lottie from "lottie-web";
import lottie404 from "@/assets/lottie_json/404错误.json";

const router = useRouter();

let animation_lottie404;
const initLottie = () => {
  animation_lottie404 = lottie.loadAnimation({
    container: document.getElementById("lottie404") as Element,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: lottie404
  });
  animation_lottie404.play();
}

onMounted(() => {
  // 检查当前 URL 是否包含 #reloaded 片段
  if (location.href.indexOf("#reloaded") == -1) {
    // 如果不包含，将 #reloaded 附加到当前 URL 上
    location.href = location.href + "#reloaded";
    // 重新加载页面
    window.location.reload();
  } else {
    // 如果已经包含 #reloaded，初始化 Lottie 动画
    initLottie();
  }
})
</script>

<style lang="scss" scoped>
@import "@/components/errorMessage/index.scss";
</style>
