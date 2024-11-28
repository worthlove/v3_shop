<!--
* @Author: GZF
* @Date: 2024-11-11 22:28:06
* @Description: Home 页面
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <!-- 头像 -->
        <div>
          <img alt='头像' src='@/assets/images/1.gif'/>
        </div>
        <!-- 标题 -->
        <div>
          <span>电 商 后 台 管 理 系 统</span>
        </div>
        <div>
          <BrightAndDark @changeTheme="changeTheme"></BrightAndDark>
          <el-button style="margin-left: 10px" type='info' @click='exitFn'>退出</el-button>
        </div>
      </el-header>
      <el-container class="content">
        <el-aside :width="isCollapse? '64px' : '200px'">
          <div class='toggleBtn' @click='toggleBtn'>|||</div>
          <el-menu :collapse="isCollapse" :collapse-transition='false' :default-active='activePath' :router='true'
                   :unique-opened='true' active-text-color='#409eff' background-color='#545c64'
                   class="el-menu-vertical-demo"
                   text-color='#fff'>
            <el-sub-menu v-for='item in menuList' :key='item.id' :index="item.id.toString()">
              <template #title>
                <i :class="iconsObj[item.id]"></i>&nbsp;
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item v-for='subItem in item.children' :key='subItem.id' :index="'/' + subItem.path"
                            @click="saveNavStatusFn('/' + subItem.path)">
                <template #title>
                  <i :class='iconsObj[item.id]'></i>&nbsp;
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="mainClass">
            <router-view></router-view>
          </el-main>
          <!--<el-footer class="footer"> GZF ©2024 - {{ new Date().getFullYear() }} Study Cases</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {useUserInfoStore} from "@/store/modules/userinfo.ts";
import router from "@/router/index.ts";
import {getMenuListApi} from "@/api/loginApi/loginApi.ts";
import BrightAndDark from "@/components/switch/brightAndDark.vue";

const isCollapse = ref(false);

const iconsObj = ref({
  125: 'iconfont icon-user',
  103: 'iconfont icon-tijikongjian',
  101: 'iconfont icon-shangpin',
  102: 'iconfont icon-danju',
  145: 'iconfont icon-baobiao'
  // 145: 'iconfont icon-baobiao'
})

// 侧边栏收缩按钮
const toggleBtn = () => {
  isCollapse.value = !isCollapse.value;
};

let activePath = ref('');

const userInfoStore = useUserInfoStore();

const token = userInfoStore.token;
console.log(token, token)


// 退出登录
const exitFn = () => {
  userInfoStore.setToken('')
  router.push('/');
};

const menuList = ref([]);

// 保存导航状态
const saveNavStatusFn = (path: string) => {
  window.sessionStorage.setItem('activePath', path)
  activePath.value = path;
};

const getMenuList = () => {
  getMenuListApi().then((res) => {
    console.log(res)
    if (res.meta.status === 200) {
      menuList.value = res.data;
      console.log(menuList.value, '菜单列表')
    }
  });
}

onMounted(() => {
  getMenuList();
  // activePath = window.sessionStorage.getItem('activePath')
});

const changeTheme = (activeState: boolean) => {
  activeState = !activeState;
  console.log(activeState);
};

</script>

<style lang="scss" scoped>
.el-container {
  height: calc(100vh - 60px);
  width: 100vw;
}

.header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 55px;
  font-size: 30px;
  font-weight: bold;

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    > img {
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      border-radius: 50%;
      // bug修复: 修改box-shadow属性值
      box-shadow: 0 0 5px #ddd;
    }

    > span {
      // 渐变色字体
      background-image: linear-gradient(to bottom right, #2de2ff, #8b67fb);
      background-clip: text;
      color: transparent;
      letter-spacing: 0.4em;
    }
  }

  > span {
    margin-left: 15px;
  }
}

.content .el-aside {
  background-color: #373d41 !important;

  .toggleBtn {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center !important;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .el-menu {
    border-right: 0;
  }
}

.content .el-main {
  width: 100%;
  padding: 1rem;
  //background-image: url('@/assets/16.jpg');
  background-size: 100% 100%;
  height: 100%; /* 假设顶部有一个100px高的工具栏 */
  overflow-y: auto; /* 开启滚动 */
  position: relative; /* 相对定位 */
  background-color: #63a9ee
}


.content.iconfont {
  margin-right: 10px;
  font-size: 20px;
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 100%;
}
</style>
