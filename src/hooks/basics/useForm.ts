import {ref} from "vue";
import {deepClone} from "@/utils/publicFun";


export function useFormData<T extends Record<string, any>>(form: T){

    const formData = ref(deepClone(form))

    function setDefaultData(defaultData: T){
        form = defaultData
        formData.value = defaultData
    }

    function reset(){
        formData.value = form
    }

    return {
        formData,
        setDefaultData,
        reset

    }
}