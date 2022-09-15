import {useI18n as baseI18n} from "vue3-i18n";
import {useStore} from "@/store";
import {onMounted} from "vue";

export function useI18n (){
    const i18n = baseI18n()
    const {setState, state} = useStore()

    function setLocale(locale: string){
        setState('language', locale)
        i18n.setLocale(locale)
    }

    onMounted(()=>{
        setLocale(state.language as string)
    })

    return {
        t: i18n.t,
        getLocale: i18n.getLocale,
        setLocale
    }
}