import { Config } from "./lib/weixin-sdk/common";

let weixinConfig: Config = {
    isSandBox: true, // 沙盒测试 
    appId: "wxf1c24c60e3ac13b7",
    appKey: "5902b9817acb7a290d4b7c2e6e97d4d3",
    partnerId: "1236045602",
    partnerKey: "a312b8e09667d4b9c25fae66c5822d6e",
    miniAppId: "wx959000e198e0eeb3", // 小程序测试号
    miniAppKey: "170560eea908f7ec277e116b56b18e60",  // 小程序测试号
}

export let config = {
    port: 65253,
    baseURL: "http://web.alinq.cn/weixin",
    weixin: weixinConfig
}