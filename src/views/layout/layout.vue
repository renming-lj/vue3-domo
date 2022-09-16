<!--
 * @Description: layout
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/19 17:26
 * @LastEditors: yanxiao
 * @Path: src/views/layout/microservice-governance.vue
-->
<template>
  <div class='layout'>
    <el-container style="height: 100vh">
      <el-header class="header" style="padding: 0;">
        <div class="logo" @click="changeCollapse">Vue3公共组件封装使用</div>
        <div class="header-right">
          <div style="margin-right:10px;cursor: pointer"
               v-i18n="'hello'"
               @click="setLocale(getLocale()==='zh'?'en':'zh')"></div>
              <el-switch style="margin-right:10px;"
                         v-model="themeValue"
                         inline-prompt
                         active-value="dark"
                         active-color="#5068a1"
                         :active-icon="Sunny"
                         inactive-value="light"
                         inactive-color="#273d6e"
                         :inactive-icon="Moon"/>
          <el-icon :size="20" ><search /></el-icon>
          <el-icon :size="20"><bell /></el-icon>
          <div class="user-info">
            <div class="portrait"></div>
            <div>Vue3公共组件封装使用</div>
          </div>
        </div>
        <div class="header-right-folding">
          <el-dropdown trigger="click">
            <div class="portrait"></div>
            <template #dropdown>
              <el-dropdown-menu>
                <div style="text-align: center;">Vue3公共组件封装使用</div>
                <el-dropdown-item>
                  <el-icon :size="20" ><search /></el-icon>
                  <span>搜索</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon :size="20"><bell /></el-icon>
                  <span>消息</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container style="height: calc(100vh - 60px);">
        <el-aside class="aside" >
          <side-nav :routes="routes"
                    :default-active="menuActive"
                    :collapse="isCollapse"
                    router
                    mode="vertical"></side-nav>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideNav from "@/components/SideNav";
import {Search, Bell, Moon,Sunny} from '@element-plus/icons-vue'
import {routes} from "./data";
import { useMenuActive,useMenuCollapse} from "./useLayout";
import {useI18n} from "@/hooks/global/useI18n";
import {useTheme} from "@/hooks/global/useTheme";

const {menuActive} = useMenuActive()
const {isCollapse,changeCollapse,defaultWidth } = useMenuCollapse()
const {setLocale,getLocale,t} = useI18n()

const {themeValue} =useTheme()
</script>
<style lang='scss' scoped>
.aside{
  width: v-bind(defaultWidth);
  background:#031529;
}
.header{
  display: flex;
  justify-content: space-between;
  background:  #031529;
  .logo{
    flex-shrink: 0;
    width: 200px;
    text-align: center;
    line-height: 60px;
    font-weight: 800;
    font-size: 18px;
    color:  #ffffff;
    cursor: pointer;
  }
  .header-right{
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;
    color:  #ffffff;
    .el-icon{
      margin-right: 20px;
      color:  #ffffff;
    }
    .user-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .portrait{
    margin-right: 10px;
    width: 30px;
    height: 30px;
    background: aliceblue;
    border-radius: 50%;
  }
  .header-right-folding{
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.main{
  padding: 0;
  width: 100%;
  height: 100%;
  //background: #f0f2f5;
  overflow: hidden;
}
.side-top{
  height: 60px;
}
.layout:deep(.el-menu) {
  border: #031529;
  --el-menu-text-color: #ffffff !important;
  --el-menu-hover-text-color: #3f9eff !important;
  // 激活文字颜色
  --el-menu-active-color: #3f9eff !important;
  --el-menu-bg-color: #031529 !important;
  --el-menu-hover-bg-color: #07315f !important;
}
.layout:deep(.el-menu-item.is-active) {
  background: #07315f;
}

.layout:deep(.is-hide) {
  color: #ffffff !important;
}

@media (min-width: 640px) {
  .header-right{
    display: flex;
  }
  .header-right-folding{
    display: none;
  }
}

@media (max-width: 640px) {
  .header-right{
    display: none;
  }
  .header-right-folding{
    display: flex;
  }
}
</style>
