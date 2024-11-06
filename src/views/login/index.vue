<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field g-container">
            <i class="fas fa-user"></i>
            <input placeholder="Username" type="text" class="g_input_search"/>
          </div>
          <div class="input-field g-container">
            <i class="fas fa-lock"></i>
            <input placeholder="Password" type="password" class="g_input_search"/>
          </div>
          <input class="btn solid" type="submit" value="Sign In"/>
        </form>
        <form action="#" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field g-container">
            <i class="fas fa-user"></i>
            <input placeholder="Username" type="text" class="g_input_search"/>
          </div>
          <div class="input-field g-container">
            <i class="fas fa-envelope"></i>
            <input placeholder="Email" type="email" class="g_input_search"/>
          </div>
          <div class="input-field g-container">
            <i class="fas fa-lock"></i>
            <input placeholder="Password" type="password" class="g_input_search"/>
          </div>
          <input class="btn" type="submit" value="Sign up"/>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <BrightAndDark @changeTheme="changeTheme"></BrightAndDark>
        </div>
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Enter your details and start your journey with us
          </p>
          <button id="sign-up-btn" class="btn transparent">
            Sign up
          </button>
        </div>
        <div id="lottieMan" class="image"></div>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <BrightAndDark @changeTheme="changeTheme"></BrightAndDark>
        </div>
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            To keep connected with us please login with your personal info
          </p>
          <button id="sign-in-btn" class="btn transparent">
            Sign in
          </button>
        </div>
        <div id="lottieWoman" class="image"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import BrightAndDark from "@/components/switch/brightAndDark.vue";
import {onMounted, ref} from 'vue';

// 导入 Lottie 动画库
import lottie from "lottie-web"
// 导入 Lottie 动画 JSON 文件
import lottieWoMan from "@/assets/lottie_json/办公女.json"
import lottieMan from "@/assets/lottie_json/办公男.json"

const sign_in_btn = ref<HTMLButtonElement | null>(null);
const sign_up_btn = ref<HTMLButtonElement | null>(null);
const container = ref<HTMLDivElement | null>(null);

// 定义两个变量，用于存储 Lottie 动画实例
let animation_lottieMan, animation_lottieWoMan;

// 定义一个函数，用于初始化 Lottie 动画
const initLottie = () => {
  // 使用 lottie-web 库加载动画，将其渲染为 SVG 格式，并设置为循环播放和自动播放
  animation_lottieMan = lottie.loadAnimation({
    // 获取 id 为 lottieMan 的元素，并将其作为动画的容器
    container: document.getElementById("lottieMan") as Element,
    // 指定渲染器为 SVG
    renderer: "svg",
    // 设置动画循环播放
    loop: true,
    // 设置动画自动播放
    autoplay: true,
    // 指定动画数据，这里使用了从 lottieMan.json 文件中导入的动画数据
    animationData: lottieMan
  });

  // 同样的方式加载另一个动画，使用从 lottieWoMan.json 文件中导入的动画数据
  animation_lottieWoMan = lottie.loadAnimation({
    container: document.getElementById("lottieWoman") as Element,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: lottieWoMan
  });

  // 播放两个动画
  animation_lottieMan.play();
  animation_lottieWoMan.play();
};


onMounted(() => {
  sign_in_btn.value = document.querySelector("#sign-in-btn");
  sign_up_btn.value = document.querySelector("#sign-up-btn");
  container.value = document.querySelector(".container");

  if (sign_up_btn.value && container.value) {
    sign_up_btn.value.addEventListener("click", () => {
      container.value?.classList.add("sign-up-mode");
    });
  }

  if (sign_in_btn.value && container.value) {
    sign_in_btn.value.addEventListener("click", () => {
      container.value?.classList.remove("sign-up-mode");
    });
  }

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
});

const changeTheme = (activeState: boolean) => {
  activeState = activeState ? false : true;
};
</script>


<style lang="less" scoped>
@import "@/views/login/styles/login.less";
</style>
