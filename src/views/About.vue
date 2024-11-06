<!-- src/views/About.vue -->


<template>
  <div class="vertical-layout">
    <header>
      <h1>About Page</h1>
    </header>
    <main>
      <el-button type="primary" @click="goToOtherPage">跳转到其他页面</el-button>
      <p>Your main content goes here.</p>
    </main>
    <footer>
      <p>Footer content goes here.</p>
    </footer>
  </div>
</template>
<script setup lang="ts" name="About">
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store/modules/login';
import { useUserInfoStore } from '@/store/modules/userinfo.ts';
import { loginApi } from '@/api/loginApi/loginApi';
import { ElNotification } from "element-plus";

const router = useRouter();
const loginStore = useLoginStore();
const userInfoStore = useUserInfoStore();

const goToOtherPage = () => {
  console.log('Clicked!');
  // 在这里指定你想要跳转的路径
  router.push('/');
  console.log('goToOtherPage====>',loginStore.language,'start');

  loginStore.setGlobalState("language", 'eh');

  console.log('goToOtherPage====>',loginStore.language,'end');

  const params = {
    username: 'admin',
    password: '123456'
  }
  loginApi(params).then(res=> {
    if (res.meta.status !== 200) {
      ElNotification.error(res.meta.msg)
    } else {
      console.log(res.data.token)
      ElNotification.success(res.meta.msg)

      console.log('goToOtherPage====>',userInfoStore.token,'start');
      userInfoStore.setToken(res.data.token);
      console.log('goToOtherPage====>',userInfoStore.token,'end');

      // 将从接口中获取的 token令牌 存储到 sessionStorage 中
      // window.sessionStorage.setItem('token', res.data.token)
      // 通过编程式导航,跳转后台主页,路由地址: /home
    }
  })
};

console.log(loginStore.language,'start');

loginStore.setGlobalState("language", 'zh');

console.log(loginStore.language,'end');

</script>
<style scoped>
.vertical-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh; /* 设置整个布局高度为视口高度，以确保内容在竖屏中居中显示 */
}
header, main, footer {
  width: 100vw; /* 设置宽度为80% */
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  background-color: #f0f0f0;
  margin:0;
}
@media screen and (max-width: 600px) {
  /* 在小屏幕上，设置宽度为100% */
  header, main, footer {
    width: 100%;
  }
}
</style>
