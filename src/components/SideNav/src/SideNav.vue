<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/16 09:25
 * @LastEditors: yanxiao
 * @Path: src/component/SideNav/manage-multiple-cloud.vue
-->
<template>
  <div class="">
    <el-scrollbar>
      <el-menu v-bind="$attrs" @select="selectMenu">
        <side-nav-item v-for="route in routes"
                       :key="route.code"
                       :item="route">
        </side-nav-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SideNavItem from './SideNavItem.vue'

const props = defineProps({
  routes: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['select'])
function selectMenu(index: string){
  emit('select',index)
}

</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>