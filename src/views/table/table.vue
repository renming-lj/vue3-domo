<!--
 @Name 
 @Description 
 @author lijun
 @date 2022/9/16
-->

<template>
  <div class='home'>
    <!-- 使用组件 -->
    <Table :data="tableData" @submit="editData"></Table>
    <p>注:语文、数学、英语可修改</p>
  </div>
</template>

<script setup lang="ts">
// 引入组件
import Table from '@/components/table/table.vue'
import {ref} from "vue";

const tableData = ref({
  tHead: [
    {
      key: 'id',
      text: '学号',
      // 是否可修改
      editable: false
    }, {
      key: 'name',
      text: '姓名',
      // 是否可修改
      editable: false
    }, {
      key: 'age',
      text: '年龄',
      // 是否可修改
      editable: false
    }, {
      key: 'chinese',
      text: '语文',
      // 是否可修改
      editable: true
    }, {
      key: 'math',
      text: '数学',
      // 是否可修改
      editable: true
    }, {
      key: 'english',
      text: '英语',
      // 是否可修改
      editable: true
    }
  ],
  tBody: [
    {
      id: 1,
      name: '张三',
      age: 20,
      chinese: 120,
      math: 100,
      english: 130
    }, {
      id: 2,
      name: '李四',
      age: 19,
      chinese: 120,
      math: 100,
      english: 130
    }, {
      id: 3,
      name: '王五',
      age: 21,
      chinese: 120,
      math: 100,
      english: 130
    }
  ]
})

const editData = ({index, key, value, text}, removeInput) => {
  if (tableData.value.tBody[index][key] != value) {
    const cfm = window.confirm(`你确定要将数据下标为 【${index}】项的【${text}】字段修改为【${value}】吗？`);
    if (cfm) {
      tableData.value.tBody = tableData.value.tBody.map((item, idx) => {
        index === idx && (item[key] = value);
        return item
      });
    } else {
      removeInput()
    }
  }
}
</script>

<style scoped>
.home {
  width: 95%;
  height: 100%;
  margin: 10px auto;
}
</style>