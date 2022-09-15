import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import ElementPlus from 'element-plus'
import i18n from "./i18n";
import directive from "./directive";
import echarts from "@/utils";
import "echarts-gl" //3D插件

import './styles/index.scss'

const app = createApp(App)

app.config.globalProperties.$echarts = echarts

app.use(router)
app.use(i18n)
app.use(directive)
app.use(ElementPlus)
app.mount('#app')
