import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import type {BaseResPromise} from "@/types/http";
import {HttpContentType} from "@/enum/httpEnum";

interface AxiosRequestConfigUrl extends AxiosRequestConfig {
    url: string
}

export interface AxiosOptions {
    reqFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    reqRejected?: (error: any) => any,
    resFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    resRejected?: (error: any) => any,
}

export default class Axios {
    // http 实例
    private axiosInstance: AxiosInstance
    private config: AxiosRequestConfig
    private readonly options: AxiosOptions
    constructor(config: AxiosRequestConfig, options: AxiosOptions) {
        this.axiosInstance = axios.create(config)
        this.config = config
        this.options = options
        this.setupInterceptors()
    }
    private setupInterceptors(){
        const { reqFulfilled, reqRejected, resFulfilled, resRejected } = this.options
        this.axiosInstance.interceptors.request.use(
            reqFulfilled,
            reqRejected
        )
        this.axiosInstance.interceptors.response.use(
            resFulfilled,
            resRejected
        )
    }
    // 文件上传
    public upload<T>(config: AxiosRequestConfig, onUploadProgress?:Function){
        let formData = new FormData()
        for (const dataKey in config.data) {
            formData.append(dataKey, config.data[dataKey])
        }
        return this.request<T>({
            headers: {
                'Content-type': HttpContentType.FORM_DATA,
            },
            ...config,
            data: formData,
            onUploadProgress: onUploadProgress as (progressEvent: any) => void,
        })
    }

    public download<T>(config: AxiosRequestConfigUrl, onDownloadProgress?:Function): Promise<T>{
        return this.axiosInstance.request({
            method: 'POST',
            // @ts-ignore
            requestType: 'upload',
            ...config,
            onDownloadProgress: onDownloadProgress as (progressEvent: any) => void,
        })
    }

    public request<T>(config: AxiosRequestConfig): BaseResPromise<T>{
        return this.axiosInstance.request(config)
    }
}

