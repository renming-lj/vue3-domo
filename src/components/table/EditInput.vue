<!--
 @Name
 @Description
 @author lijun
 @date 2022/9/16
-->

<template>
  <input type="text" class="edit-input" :value="value" @input="onInput" @blur="onBlur" @click="onClick">
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  // 修改函数
  setValue: {
    type: Function,
    default: () => {
    }
  }
});

const inputValue = ref(props.value);
// 设置值
const onInput = (e) => {
  inputValue.value = e.target.value.trim();
}

// 点击时执行
const onClick = (e) => {
  // 阻止冒泡
  e.stopPropagation();
}

// 失去焦点
const onBlur = () => {
  props.setValue(inputValue.value)
}
</script>

<style scoped>
.edit-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #000000;
  text-align: center;
  outline: none;
}
</style>