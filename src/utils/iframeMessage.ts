import {CheckType} from "@/utils/checkType";
import {nanoid} from "nanoid";

export enum MsgType {
    // 普通消息类型
    MESSAGE,
    // 需要回复的消息类型
    CB_MSG,
    // 为 需要回复的消息 进行回复的类型
    CALLBACK,
}

// 用户需传递的消息格式
export interface MsgData {
    type: string,
    msg: any
}

// 使用postMessage最终传递的消息格式
export interface MsgBody{
    msgType: MsgType,
    msgId: string
    msgData: MsgData,
}

// 用户监听消息的回调函数类型，msgData：消息内容，reply：调用它为这条消息进行回复
export type OnMessage = (msgData: MsgData, reply?:(msgData: MsgData)=>void)=>void

export class IframeMessage{
    // iframe窗口
    private contentWindow: WindowProxy;

    // 发消息时的回调集合；发送一个CB_MSG消息时，将回调函数存起来，收到CALLBACK消息时再取出来调用
    private callbackFun = new Map<string, (msgData: MsgData)=>void>()

    // 最后一次的发送消息的id,用来屏蔽自己的消息
    private lastId: string | undefined;

    // 构造函数接收一个iframe的dom元素，和一个监听消息的回调
    constructor(iframe?: HTMLIFrameElement, onMsg?: OnMessage) {
        if(CheckType.isExist<WindowProxy>(iframe?.contentWindow)){
            this.contentWindow = iframe!.contentWindow
        }else{
            // 如果不传递第一个参数则视为该项目为子应用，默认取window.top与父应用通信
            if(CheckType.isExist<WindowProxy>(window.top)){
                this.contentWindow = window.top
            }else {
                throw 'iframe.contentWindow or window.top notFound'
            }
        }
        // 监听消息
        this.onMsg(onMsg)
    }

    private onMsg(onMsg?: OnMessage) {
        window.addEventListener('message', this.on.bind(this), false);
        // 将回调保存
        if(CheckType.isFunction(onMsg)) this.onMessage = onMsg
    }

    // 消息回调：构造参数覆盖它或使用对象覆盖它
    public onMessage: OnMessage = ()=>{}

    private on(event: MessageEvent<MsgBody>){
        // 过滤自己的消息 和 不符合规范的消息体
        if(this.lastId === event.data.msgId ||
            !CheckType.isExist(event.data.msgId) ||
            !CheckType.isExist(event.data.msgData) ||
            !CheckType.isExist(event.data.msgData)) return

        // console.log('子应用监听消息 filter',event,'lastId',this.lastId)
        switch (event.data.msgType){
            // 普通消息
            case MsgType.MESSAGE:
                this.onMessage(event.data.msgData)
                break
            // 需要回复的消息
            case MsgType.CB_MSG:
                this.onMessage(event.data.msgData,(msgData: MsgData)=>this.replyMessage(event.data.msgId, msgData))
                break
            // 回复的消息
            case MsgType.CALLBACK:
                // 通过msgId找到发送消息时储存的回调函数并调用
                const msgId = event.data.msgId
                const data = event.data.msgData
                this.callbackFun.get(msgId)!(data)
                // 调用结束后删除回调
                this.callbackFun.delete(msgId)
                break
        }
    }

    // 取消监听
    public offMessage(){
        window.removeEventListener('message',this.on.bind(this))
        // 页面销毁时清空回调列表
        this.callbackFun.clear()
    }

    // 发送消息
    public seedMessage(msgData: MsgData, callback?: (msgData: MsgData)=>void){
        // 发送的消息体包括 type、msgId、data
        const msgId = nanoid()
        this.lastId = msgId
        const msgBody: MsgBody = {
            msgType: MsgType.MESSAGE,
            msgId,
            msgData:msgData,
        }
        // 将callback保存
        if(callback){
            msgBody.msgType = MsgType.CB_MSG
            this.callbackFun.set(msgId, callback)
        }
        this.contentWindow.postMessage(msgBody,'*')
    }

    // 回复消息
    private replyMessage(msgId: string, msgData: MsgData){
        // 回复
        const message: MsgBody = {
            msgType: MsgType.CALLBACK,
            msgId,
            msgData: msgData,
        }
        this.contentWindow.postMessage(message,'*')
    }
}

