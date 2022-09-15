import {computed, Ref, ref} from "vue";
import {DialogFormModeEnum} from "@/enum/dict";


export function useDialog(dialogName: string){

    const showDialog = ref(false)
    const dialogMode: Ref<DialogFormModeEnum> = ref(DialogFormModeEnum.ADD)

    const dialogTitle = computed(()=>{
        switch (dialogMode.value){
            case DialogFormModeEnum.ADD:
                return '新增' + dialogName
            case DialogFormModeEnum.UPDATE:
                return '修改' + dialogName
            case DialogFormModeEnum.DETAILS:
                return dialogName + '详情'
        }
    })

    function openAddDialog(){
        showDialog.value = true
        dialogMode.value = DialogFormModeEnum.ADD
    }

    function openUpdateDialog(){
        showDialog.value = true
        dialogMode.value = DialogFormModeEnum.UPDATE
    }

    function openDetailsDialog(){
        showDialog.value = true
        dialogMode.value = DialogFormModeEnum.DETAILS
    }

    return{
        showDialog,
        dialogMode,
        dialogTitle,
        openAddDialog,
        openUpdateDialog,
        openDetailsDialog
    }

}