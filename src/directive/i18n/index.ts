import {computed, watch} from "vue";
import type {App,DirectiveBinding} from "vue";
import i18n from "@/i18n/index";

export default {
    install(app: App) {
        app.directive('i18n', {
            mounted(el:HTMLElement,binding:DirectiveBinding){
                el.innerText = i18n.t(binding.value)
                watch(computed(()=>i18n.t(binding.value)),()=>{
                    el.innerText = i18n.t(binding.value)
                })
            },
        })
    }
}