/*
 * @Description: 网络请求选项
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/5/19 10:36
 * @Path: src/enum/httpEnum.ts
 */

// 网络请求 环境地址
export enum BaseUrl {
    ONLINE = ''
}

// 请求体类型
export enum HttpContentType {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
