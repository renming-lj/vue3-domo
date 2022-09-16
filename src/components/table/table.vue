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

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      tHead: [],
      tBody: []
    })
  }
});
const emit = defineEmits(['submit']);

const {tHead, tBody} = toRefs(props.data);

function showEditInput(event, key, index) {
  console.log('event', event, 'key', key, 'index', index)
  editInputApp && removeEditInputApp(editInputApp);
  if (!checkEditable(key)) return;

  const target = event.target;
  const oFrag = document.createDocumentFragment();

  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue
  });
  if (editInputApp) {
    editInputApp.mount(oFrag);
    target.appendChild(oFrag);
    target.querySelector('.edit-input').select();
  }

  setData({index, key, text: findText(key)})
}

function setData({index, key, text, value = ''}) {
  state.key = key;
  state.index = index;
  state.value = value;
  state.text = text;
}

function setValue(value) {
  state.value = value;
  emit('submit', {...state}, removeEditInputApp)
}

function findText(key) {
  const {text} = tHead.value.find(item => item.key === key);
  return text;
}

function removeEditInputApp() {
  editInputApp && editInputApp.unmount();
  setData({
    index: -1,
    key: '',
    value: '',
    text: ''
  })
}

function checkEditable(key) {
  const {editable} = tHead.value.find(item => item.key === key);
  return editable;
}

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