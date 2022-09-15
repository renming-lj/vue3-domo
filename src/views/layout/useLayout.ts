import {useStore} from "@/store";
import {useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded} from 'vue-router';
import {computed, onMounted, ref} from "vue";
import {Animate} from "@/utils/animate";
import {useLoading} from "@/utils/feedback";

// 菜单激活下标 切换/显示 方法
export function useMenuActive(){
    const {setState,state} = useStore()
    const route = useRoute()
    // 监听路由变化，设置导航激活下标
    onBeforeRouteUpdate(updateMenu)

    onMounted(()=>updateMenu(route))

    // 更新菜单状态
    function updateMenu(route:RouteLocationNormalizedLoaded){
        // 顶部导航设置激活标签
        setState('menuActive',route.meta.code as string)
        document.title = route.meta.title as string || 'dcp'
        // 设置全局加载状态
        // setLoading()
    }

    // 设置全局加载状态
    function setLoading(){
        const loading = useLoading('.main')
        loading.open()
        setTimeout(()=>{
            loading.close()
        },1000)
    }

    return {
        menuActive: computed(()=>state.menuActive),
    }
}

// 侧边栏展开折叠方法
export function useMenuCollapse(){
    let isCollapse = ref(false)
    let defaultWidth = '200px'
    const animate = new Animate('.aside')
    // const animate = useAnimate('.aside')
    function changeCollapse(){
        if(isCollapse.value){
            animate.addAnimate({width: '200px'}, [0.3])
        }else{
            animate.addAnimate({width: '64px'}, [0.3])
        }
        animate.run()
        isCollapse.value = !isCollapse.value
    }

    return {
        // 是否折叠
        isCollapse,
        // 切换折叠状态
        changeCollapse,
        // 侧边栏默认宽度
        defaultWidth
    }
}