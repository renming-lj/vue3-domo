<!--
 @Name
 @Description
 @author lijun
 @date 2022/9/15
-->

<template>
    <div :id="props.id" :style="props.style"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  change();
});
const props = defineProps({
  // id
  id:String,
  // echart数据
  options:Object,
  // echart加载区域
  style:Object
})
// 基本柱形图
const change = () => {
  const chartBox = echarts.init(document.getElementById(props.id!)!);
  const option = {...props.options};
  chartBox.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chartBox.resize();
  });
};
</script>

<style scoped>
</style>