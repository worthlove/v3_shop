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
<script lang="ts" setup>
import {useRouter} from 'vue-router';
import {useUserInfoStore} from '@/store/modules/userinfo.ts';
import {loginApi} from '@/api/loginApi';
import {ElNotification} from "element-plus";

const router = useRouter();
const userInfoStore = useUserInfoStore();

const goToOtherPage = () => {
  console.log('Clicked!');
  // 在这里指定你想要跳转的路径
  router.push('/');

  const params = {
    username: 'admin',
    password: '123456'
  }
  loginApi(params).then(res => {
    if ((res as any).meta.status !== 200) {
      ElNotification.error((res as any).meta.msg)
    } else {
      console.log(res.data.token)
      ElNotification.success((res as any).meta.msg)

      // 调用 store 中的方法,将 token 存储到 store 中
      userInfoStore.setToken(res.data.token);
    }
  })
};

</script>
<style scoped>
.vertical-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  /* 设置整个布局高度为视口高度，以确保内容在竖屏中居中显示 */
}

header,
main,
footer {
  width: 100vw;
  /* 设置宽度为80% */
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  background-color: #f0f0f0;
  margin: 0;
}

@media screen and (max-width: 600px) {

  /* 在小屏幕上，设置宽度为100% */
  header,
  main,
  footer {
    width: 100%;
  }
}
</style>
