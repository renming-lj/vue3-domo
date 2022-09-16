<!--
 @Name
 @Description
 @author lijun
 @date 2022/9/16
-->

<template>
  <table border="1" class="my-table">
    <thead>
    <tr>
      <th v-for="info in tHead" :key="info.key">{{ info.text }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in tBody" :key="item.id">
      <td v-for="(value,key) in item" :key="key" @click.stop="showEditInput($event,key,index)">{{ value }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {createApp, reactive, toRefs} from "vue";
import EditInput from './EditInput.vue';

let editInputApp = null;

const state = reactive({
  key: '',
  value: '',
  index: -1,
  text: ''
})

// 接收父组件传递的值
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      tHead: [],
      tBody: []
    })
  }
});
// 腹肌触发的事件
const emit = defineEmits(['submit']);

// 解构父级传递的值（响应式）
const {tHead, tBody} = toRefs(props.data);

// 点击事件
function showEditInput(event, key, index) {
  console.log('event', event, 'key', key, 'index', index)
  // 如果存在就移除
  editInputApp && removeEditInputApp(editInputApp);
  // 不能被点击
  if (!checkEditable(key)) return;

  // 拿到元素节点
  const target = event.target;
  const oFrag = document.createDocumentFragment();

  // 将 input 添加至节点中 start
  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue
  });
  if (editInputApp) {
    editInputApp.mount(oFrag);
    target.appendChild(oFrag);
    // 选中值
    target.querySelector('.edit-input').select();
  }
  // 将 input 添加至节点中 end

  setData({index, key, text: findText(key)})
}

// 赋值方法
function setData({index, key, text, value = ''}) {
  state.key = key;
  state.index = index;
  state.value = value;
  state.text = text;
}

// 设置 value 触发父级事件
function setValue(value) {
  state.value = value;
  emit('submit', {...state}, removeEditInputApp)
}

// text
function findText(key) {
  const {text} = tHead.value.find(item => item.key === key);
  return text;
}

// 修改
function removeEditInputApp() {
  editInputApp && editInputApp.unmount();
  setData({
    index: -1,
    key: '',
    value: '',
    text: ''
  })
}

// 判断是否可以被修改
function checkEditable(key) {
  const {editable} = tHead.value.find(item => item.key === key);
  return editable;
}

// 处理点击空白处报错问题
window.addEventListener('click', removeEditInputApp, false);
</script>

<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
}

tr {
  height: 44px;
}

td {
  position: relative;
  text-align: center;
  cursor: pointer;
}
</style>