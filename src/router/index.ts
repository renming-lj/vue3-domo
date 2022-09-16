/*
 * @Description: 路由
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/15 17:00
 * @LastEditors: yanxiaos
 * @Path: src/router/index.ts
 */
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/views/layout/layout.vue";

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  name: "/",
  redirect: '/about',
  component: Layout,
  children: [
    {
      path: '/home',
      name: "Home",
      component: ()=>import('@/views/home/Home.vue'),
      meta:{
        // document.title 标题
        title: '柱状图',
        code: 'H1001'
      }
    },{
      path: '/about',
      name: "About",
      component: ()=>import('@/views/about/About.vue'),
      meta:{
        title: '地图',
        code: 'H1002'
      }
    },{
      path: '/pie',
      name: "Pie",
      component: ()=>import('@/views/pie/pieEcharts.vue'),
      meta:{
        title: '饼图',
        code: 'H1003'
      }
    },{
      path: '/gps',
      name: "Gps",
      component: ()=>import('@/views/gps/gps.vue'),
      meta:{
        title: '雷达图',
        code: 'H1004'
      }
    },{
      path: '/graph',
      name: "Graph",
      component: ()=>import('@/views/graph/graph.vue'),
      meta:{
        title: '关系图',
        code: 'H1005'
      }
    },{
      path: '/lines',
      name: "Lines",
      component: ()=>import('@/views/lines/lines.vue'),
      meta:{
        title: '路径图',
        code: 'H1006'
      }
    },{
      path: '/bar3d',
      name: "Bar3d",
      component: ()=>import('@/views/bar3d/bar3d.vue'),
      meta:{
        title: '3D柱状图',
        code: 'H1007'
      }
    },{
      path: '/funnel',
      name: "Funnel",
      component: ()=>import('@/views/funnel/funnel.vue'),
      meta:{
        title: '漏斗图',
        code: 'H1008'
      }
    },{
      path: '/table',
      name: "Table",
      component: ()=>import('@/views/table/table.vue'),
      meta:{
        title: '可编辑table',
        code: 'H1009'
      }
    },
  ]
}]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
