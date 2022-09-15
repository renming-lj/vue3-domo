import {computed, watchEffect} from "vue";
import {useStore} from "@/store";

export function useTheme(){
  const {state, setState} = useStore()
  const themeValue = computed({
    get: ()=>state.globalStyle as string,
    set: val=>setState('globalStyle', val as string)
  })

  watchEffect(()=>{
      let el:any = document.querySelector('html')
      el.setAttribute('class', themeValue.value as string)
  })

  const themeOption= [
    {
      value: 'dark',
      label: '暗色',
    },
    {
      value: 'light',
      label: '亮色',
    },
  ]

  function setTheme(theme: string){
    themeValue.value = theme
  }
  return {
    themeValue,
    themeOption,
    setTheme
  }
}
