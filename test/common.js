const { WeiXinSDK } = require("../out/lib/weixin-sdk/index");
const { config } = require("../out/config");
const { guid } = require("maishu-chitu-service");

let weixinSDK = new WeiXinSDK();
weixinSDK.config.appid = config.weixin.appId;
weixinSDK.config.appkey = config.weixin.appKey;
weixinSDK.config.partnerId = config.weixin.partnerId;
weixinSDK.config.partnerKey = config.weixin.partnerKey;
weixinSDK.config.isSandBox = true;

exports.weixinSDK = weixinSDK;