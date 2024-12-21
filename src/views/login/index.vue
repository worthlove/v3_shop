<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="loginBox sign-in-form">
          <el-card class="card" style="max-width: 480px">
            <template #header>
              <div class="card-header" style="text-align: center">
                <span style="font: bold 200% Consolas, Monaco, monospace;font-weight: 500;">Sgin In</span>
              </div>
            </template>
            <div class="card-body">
              <el-form ref="formRef" :model="form" :rules="rules" style="align-items: normal;padding: 0">
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="input-field g-container" prop="username">
                      <el-input v-model="form.username" class="g_input_search" placeholder="Username">
                        <template #prefix>
                          <i class="iconfont">&#xe622;</i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item class="input-field g-container" prop="password">
                      <el-input v-model="form.password" class="g_input_search" placeholder="Password">
                        <template #prefix>
                          <i class="iconfont">&#xe62a;</i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <template #footer>
              <el-row justify="space-evenly">
                <el-col :span="8">
                  <el-button round size="large" style="width:100%;padding:8px 15px" type="primary" @click="loginFn">
                    Login
                  </el-button>
                </el-col>
                <el-col :span="8">
                  <el-button round size="large" style="width:100%;padding:8px 15px" type="info">Reset</el-button>
                </el-col>
              </el-row>
            </template>
          </el-card>
        </form>

        <form action="#" class="sign-up-form loginBox">
          <el-card class="card" style="max-width: 480px">
            <template #header>
              <div class="card-header" style="text-align: center">
                <span style="font: bold 200% Consolas, Monaco, monospace;font-weight: 500;">Sgin Up</span>
              </div>
            </template>
            <div class="card-body">
              <el-row>
                <el-col :span="24">
                  <el-form :model="form" class="input-field g-container">
                    <el-input v-model="form.username" class="g_input_search" placeholder="Username">
                      <template #prefix>
                        <i class="iconfont">&#xe622;</i>
                      </template>
                    </el-input>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form :model="form" class="input-field g-container">
                    <el-input v-model="form.password" class="g_input_search" placeholder="Password">
                      <template #prefix>
                        <i class="iconfont">&#xe62a;</i>
                      </template>
                    </el-input>
                  </el-form>
                </el-col>
              </el-row>
            </div>
            <template #footer>
              <el-row justify="space-evenly">
                <el-col :span="8">
                  <el-button round size="large" style="width:100%;padding:8px 15px" type="primary" @click="RegisterFn">
                    Register
                  </el-button>
                </el-col>
                <el-col :span="8">
                  <el-button round size="large" style="width:100%;padding:8px 15px" type="info">Reset</el-button>
                </el-col>
              </el-row>
            </template>
          </el-card>
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

// 导入 Lottie 动画库
import lottie from "lottie-web"
// 导入 Lottie 动画 JSON 文件
import lottieWoMan from "@/assets/lottie_json/办公女.json"
import lottieMan from "@/assets/lottie_json/办公男.json"
import {loginApi} from "@/api/loginApi";
import {ElForm, ElNotification} from "element-plus";
import {useUserInfoStore} from "@/store/modules/userinfo.ts";
import router from "@/router";

const sign_in_btn = ref<HTMLButtonElement | null>(null);
const sign_up_btn = ref<HTMLButtonElement | null>(null);
const container = ref<HTMLDivElement | null>(null);

const userInfoStore = useUserInfoStore();

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

  console.warn("location.href", location.href);

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

const form = ref({
  username: 'admin',
  password: '123456'
});

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur'}
  ]
};

// 登录
const loginFn = () => {
  if (!formRef.value) {
    ElNotification.error('表单未初始化');
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      loginApi(form.value).then(res => {
        if ((res as any).meta.status !== 200) {
          ElNotification.error('登陆失败！')
        } else {
          ElNotification.success('登陆成功！')
          userInfoStore.setToken(res.data.token);
          // 跳转路由
          router.push('/home');
        }
      })
    } else {
      ElNotification.error('请输入正确的用户名和密码')
    }
  })
};

// 注册
const RegisterFn = () => {
}

// 更换主题
const changeTheme = (activeState: boolean) => {
  activeState = !activeState;
  console.log("changeTheme", activeState);
};
</script>


<style lang="scss" scoped>
@import "@/views/login/styles/login.scss";

.loginBox {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;

  &:hover {
    box-shadow: 0 0 30px 1px rgba(0, 255, 117, 0.30);
  }
}

.card {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;

  &:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }
}

:deep(.el-input__wrapper) {
  background: #F2F3F5;
  box-shadow: none;
  border-radius: 55px;
}

:deep(.el-input__inner) {
  background: #F2F3F5;
  box-shadow: none;
  font-weight: 600;
  transition: 0.5s;
  font-size: 1.1rem;
  color: #acacac;
}

:deep(.el-card__footer) {
  border-top: none !important;
  padding: 0 !important;
}

//设置背景图片无缝平滑效果
//.forms-container {
//  width: 100%;
//  height: 100%;
//  display: flex;
//  background: url('@/assets/images/full-fire-cloud.jpg') repeat-x 0 center/auto 100%;
//  animation: smooth 10s linear infinite;
//  animation-play-state: running;
//}
///* main:hover, main:focus {
//  animation-play-state: running;
//} */
//@keyframes smooth {
//  to {
//    background-position: 1970px center;
//  }
//}

// 3d csemszepp
.forms-container {
  width: 100%;
  height: 100%;
  --s: 200px;
  /* control the size */
  --c1: #1d1d1d;
  --c2: #4e4f51;
  --c3: #3c3c3c;

  background: repeating-conic-gradient(from 30deg,
      #0000 0 120deg,
      var(--c3) 0 180deg) calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
  repeating-conic-gradient(from 30deg,
          var(--c1) 0 60deg,
          var(--c2) 0 120deg,
          var(--c3) 0 180deg);
  background-size: var(--s) calc(var(--s) * 0.577);
}

/* From Uiverse.io by kandalgaonkarshubham */
//.forms-container {
//  width: 100%;
//  height: 100%;
//  background: radial-gradient(
//          circle farthest-side at 0% 50%,
//          #282828 23.5%,
//          rgba(255, 170, 0, 0) 0
//  ) 21px 30px,
//  radial-gradient(
//          circle farthest-side at 0% 50%,
//          #a1000e 24%,
//          rgba(240, 166, 17, 0) 0
//  ) 19px 30px,
//  linear-gradient(
//          #282828 14%,
//          rgba(240, 166, 17, 0) 0,
//          rgba(240, 166, 17, 0) 85%,
//          #282828 0
//  ) 0 0,
//  linear-gradient(
//          150deg,
//          #282828 24%,
//          #a1000e 0,
//          #a1000e 26%,
//          rgba(240, 166, 17, 0) 0,
//          rgba(240, 166, 17, 0) 74%,
//          #a1000e 0,
//          #a1000e 76%,
//          #282828 0
//  ) 0 0,
//  linear-gradient(
//          30deg,
//          #282828 24%,
//          #a1000e 0,
//          #a1000e 26%,
//          rgba(240, 166, 17, 0) 0,
//          rgba(240, 166, 17, 0) 74%,
//          #a1000e 0,
//          #a1000e 76%,
//          #282828 0
//  ) 0 0,
//  linear-gradient(90deg, #a1000e 2%, #282828 0, #282828 98%, #a1000e 0%) 0 0 #282828;
//  background-size: 40px 60px;
//}</style>
