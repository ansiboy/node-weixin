import { WeiXinSDK } from "./lib/weixin-sdk/index";
import { config } from "./config";

export let wx = new WeiXinSDK();
Object.assign(wx.config, config.weixin);