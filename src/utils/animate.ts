/*
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/12 16:10
 * @LastEditors: yanxiaos
 * @Path: src/utils/animate.ts
 */
import {Queue} from "./queue";

interface QueueVal {
    animateTime: number
    properties: Partial<CSSStyleDeclaration>,
    duration: number,
    easing: string,
    delay: number,
    cb: Function | undefined,
}

export class Animate{
    private readonly selector: string
    private elList?: NodeListOf<HTMLElement>
    private animateQueue = new Queue<QueueVal>()
    private animateTimer: NodeJS.Timeout | null = null

    constructor(selector: string) {
        this.selector = selector
    }

    public addAnimate(
        properties: Partial<CSSStyleDeclaration>,
        duration: Array<number>=[0.5, 0],
        easing: string='linear',
        cb?: Function
    ) {
        // 将数据保存在动画队列
        this.animateQueue.put({
            animateTime: (duration[0]) + (duration[1] || 0),
            properties: properties,
            duration: duration[0],
            easing: easing,
            delay: duration[1] || 0,
            cb: cb
        })
        return this
    }

    // 执行动画
    public run(){
        this.elList || (this.elList = document.querySelectorAll(this.selector))
        if(!this.verify()) return
        const data: QueueVal = this.animateQueue.get()!
        this.elList.forEach(el=>{
            el!.style.transition = `all ${data.duration}s ${data.easing} ${data.delay}s`
            for (const key in data.properties) {
                // @ts-ignore
                el.style[key] = data.properties[key]
            }
        })
        this.animateTimer = setTimeout(()=>{
            this.animateTimer = null
            // 执行动画结束的回调
            data.cb && data.cb()
            // 开启下一个动画
            this.run()
        },data.animateTime * 1000)

        return this
    }

    // 停止当前动画及之后的动画
    public stop(){
        this.elList?.forEach(el=>{
            el && (el.style.transition = '')
        })
        this.animateTimer && clearTimeout(this.animateTimer)
        return this
    }

    // 清空动画队列
    public clear(){
        this.animateQueue.clear()
    }

    // 校验
    private verify(){
        let flag = true
        if(!this.elList?.length){
            console.warn(`[useAnimate]' ${this.selector} is ${this.elList}`)
            flag = false
        }
        if(this.animateQueue.isEmpty()) {
            flag = false
        }
        if(this.animateTimer !== null) {
            flag = false
        }
        return flag
    }

}
