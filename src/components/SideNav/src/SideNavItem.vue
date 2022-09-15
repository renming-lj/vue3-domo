<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/16 09:31
 * @LastEditors: yanxiaos
 * @Path: src/component/SideNav/SideNavItem.vue
-->
<template>
<div class="">
  <el-menu-item v-if="!hasChild(item.children)"
                :route="{ path: item.path }"
                :index="item.code">
<!--    <el-image v-show="item.icon"-->
<!--         :src="item.icon"></el-image>-->
    <el-icon><DataLine /></el-icon>
    <template #title><span>{{ item.title }}</span></template>

  </el-menu-item>

  <el-sub-menu v-else
               :index="item.code"
               popper-append-to-body>
    <template #title>
<!--      <img v-show="item.icon"-->
<!--           :src="item.icon">-->
<!--      <el-icon><DataLine /></el-icon>-->
      <span>{{ item.title }}</span>
    </template>

    <side-nav-item v-for="child in item.children"
                   :key="child.code"
                   :item="child"/>
  </el-sub-menu>
</div>
</template>

<script setup lang="ts">
import {Location,DataLine} from "@element-plus/icons-vue";

defineProps({
  item:{
    type:Object,
    default:()=>({})
  }
})
function hasChild (itemChildren:[]|undefined) {
  return  itemChildren !== undefined && itemChildren.length !== 0
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>