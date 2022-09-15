
export interface BaseRes<T> {
    resultCode: string,
    resultMsg: string,
    resultEntity: T
}

export type BaseResPromise<T=any> = Promise<BaseRes<T>>
