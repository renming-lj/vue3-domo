/*
 * @Description: 反馈组件
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/6/1 09:16
 * @Path: src/utils/feedback.ts
 */

import {ElMessage,ElMessageBox} from "element-plus";

export class Feedback {

    // 删除确认
    static deleteConfirm(){
        return ElMessageBox.confirm(
            '是否删除?',
            '警告',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
    }

    static successMessage(msg?:string){
        ElMessage({
            message: msg || '操作成功',
            type: 'success',
        })
    }

    static failMessage(msg?:string){
        ElMessage({
            message: msg || '操作失败',
            type: 'error',
        })
    }

    static infoMessage(msg?:string){
        ElMessage({
            message: msg,
            type: 'info',
        })
    }
}

export function useLoading(selector:string){
    const el = document.querySelector(selector)
    let mask: Element | null = null
    function open(){
        if(!el)return
        if(!mask){
            mask = mask || getLoadMask()
            setStyle(el,{position: 'relative'})
            el.appendChild(mask)
        }
    }
    function close(){
        mask && mask.remove()
    }
    function getLoadMask(){
        const mask = document.createElement('div')
        mask.id='mask'
        setStyle(mask,{
            position: 'absolute',
            top: '0',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.68)',
        })
        mask.innerHTML=`<svg t="1650962486198" class="loading-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4482" width="200" height="200"><path d="M398.904889 719.274667l-224.568889-224.540445a158.321778 158.321778 0 0 1 0-223.857778l224.568889-224.512a158.264889 158.264889 0 0 1 223.829333 0l224.568889 224.540445a158.264889 158.264889 0 0 1 0 223.829333l-224.568889 224.568889a158.264889 158.264889 0 0 1-223.829333 0" fill="#F83CB6" p-id="4483"></path><path d="M398.904889 957.070222l-224.568889-224.568889a158.293333 158.293333 0 0 1 0-223.800889l224.568889-224.540444a158.264889 158.264889 0 0 1 223.829333 0l224.568889 224.540444a158.236444 158.236444 0 0 1 0 223.800889l-224.568889 224.568889a158.264889 158.264889 0 0 1-223.829333 0" fill="#A267F8" p-id="4484"></path><path d="M622.734222 719.303111l217.543111-217.6-217.543111-217.543111a158.264889 158.264889 0 0 0-223.829333 0l-217.6 217.571556 217.6 217.571555a158.264889 158.264889 0 0 0 223.857778 0" fill="#7E42B9" p-id="4485"></path></svg>`
        return mask
    }

    function setStyle(el:Element,style:Record<string, string> ){
        for (const styleKey in style) {
            // @ts-ignore
            el.style[styleKey] = style[styleKey]
        }
    }

    return {
        open,
        close
    }
}

