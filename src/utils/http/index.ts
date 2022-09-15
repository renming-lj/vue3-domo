import Axios from "./Axios"
import type {AxiosRequestConfig} from "axios";
import {ResponseCode} from "@/enum/ResponseCode";
import {BaseUrl} from "@/enum/httpEnum";
import router from "@/router";


export default new Axios({
    baseURL: BaseUrl.ONLINE,
    timeout: 5000
},{
    // 请求允许时拦截
    reqFulfilled: (config: AxiosRequestConfig) => {
        // do something before request is sent
        config.headers = {
            "userToken": '9b683298a84297a0426d00285a7860b3'
        }
        return config
    },
    // 请求拒绝时拦截
    reqRejected: error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    },
    // 响应成功时拦截
    resFulfilled: response => {
        // @ts-ignore
        if(response.config.requestType==='upload'){
            //"attachment;filename*=utf-8''%E9%81%93%E9%97%B8%E6%A8%A1%E6%9D%BF.xlsx"
            let fileName = undefined
            const name = response.headers['content-disposition'].split(`filename*=utf-8''`)[1]
            fileName = decodeURI(name)
            return [response.data, fileName]
        }
        const res = response.data
        switch (res.resultCode) {
            case '2000':
                // if(response.data.result !== null){
                    return res
                // }else {
                //     return Promise.reject(res)
                // }
        // switch (res.code){
        //     case ResponseCode.SUCCESS:
            // case ResponseCode.SUCCESS:
            case ResponseCode.NOT_LOGGED_IN:
            case ResponseCode.TOKEN_IS_MISSING:
            case ResponseCode.TOKEN_INVALID:
            case ResponseCode.TOKEN_EXPIRED:
            case ResponseCode.TOKEN_REMOVED:
            case ResponseCode.TOKEN_REPLACED:
                // 跳转登陆页面
                router.push({path: '/login'})
                break
        }
        return Promise.reject(res)
    },
    // 响应失败时拦截
    resRejected: error => {
        console.log('err: ' + error) // for debug
        // 错误信息提示
        return Promise.reject(error)
    }
})




