<!--
 @Name
 @Description
 @author lijun
 @date 2022/9/15
-->

<template>
  <div class='home'>
    <!-- 使用组件 -->
    <Echarts :options="options" :id="ech" :style="style"></Echarts>
  </div>
</template>

<script setup lang="ts">
// 引入组件
import Echarts from '@/components/echarts/echarts.vue'
import {ref} from "vue";

// echarts数据
let getname = ['初筛', '试讲', '非结构化面试', '入职']
let getvalue = [80, 60, 10, 5]
let data = []
for (var i = 0; i < getname.length; i++) {
  data.push({
    name: getname[i],
    value: getvalue[i],
  })
}
let colorList = [{
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: '#7BB1FF' // 0% 处的颜色
  }, {
    offset: 1,
    color: '#4185FF' // 100% 处的颜色
  }],
}, {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: '#00CFBF' // 0% 处的颜色
  }, {
    offset: 1,
    color: '#05C398' // 100% 处的颜色
  }],
}, {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: '#FFD18B' // 0% 处的颜色
  }, {
    offset: 1,
    color: '#FDAD59' // 100% 处的颜色
  }],
}, {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: '#9F9BFF' // 0% 处的颜色
  }, {
    offset: 1,
    color: '#816BFF' // 100% 处的颜色
  }],
}]
const options = ref({
  tooltip: {
    trigger: 'item',
    formatter: "{b} : {c}%"
  },
  legend: {
    data: ['初筛', '试讲', '非结构化面试', '入职'],
    type: "scroll",
    width: 500,
    right: 'center',
    bottom: '15',
    itemGap: 30,
    itemWidth: 16,
    itemHeight: 16,
    textStyle: {
      fontSize: '15',
      color: '#999',
    },
  },
  calculable: true,
  series: [{
    type: 'funnel',
    color: colorList,
    left: '25%',
    top: 60,
    bottom: 60,
    width: '50%',
    min: 0,
    max: 100,
    minSize: '5%',
    maxSize: '100%',
    sort: 'descending',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false,
      }
    },
    labelLine: {
      normal: {
        show: false
      },
      emphasis: {
        show: false,
      }
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 0
    },
    data: data
  }]
})
// echarts id
const ech = ref('man-hh')
// echarts 加载区域
const style = ref({
  width: '100%',
  height: '100%'
})
</script>

<style scoped>
.home {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
</style>