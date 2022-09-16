interface SideRoute {
    // code与/src/router中的code对应
    code: string,
    // 侧边栏标题
    title: string,
    path: string,
    icon?: string,
    children?: Array<SideRoute> | []
}

//头部导航路由
export const routes: Array<SideRoute> = [ {
    code: 'H1002',
    title: '地图',
    path: '/about',
}, {
    code: 'H1003',
    title: '饼图',
    path: '/pie',
},{
    code: 'H1001',
    title: '柱状图',
    path: '/home',
}, {
    code: 'H1004',
    title: '雷达图',
    path: '/gps',
}, {
    code: 'H1005',
    title: '关系图',
    path: '/graph',
}, {
    code: 'H1006',
    title: '路径图',
    path: '/lines',
}, {
    code: 'H1008',
    title: '漏斗图',
    path: '/funnel',
}, {
    code: 'H1007',
    title: '3D柱状图',
    path: '/bar3d',
}, {
    code: 'H1009',
    title: '可编辑table',
    path: '/table',
}]
