import { WeiXinSDK } from "./lib/weixin-sdk/index";
import { config } from "./config";

export let wx = new WeiXinSDK();

let w = config.weixin;
wx.config.isSandBox = true;
wx.config.appid = w.appId;
wx.config.appkey = w.appKey;
wx.config.partnerId = w.partnerId;
wx.config.partnerKey = w.partnerKey;
wx.config.isSandBox = true;