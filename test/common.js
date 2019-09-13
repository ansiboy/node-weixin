const { WeiXinSDK } = require("../out/lib/weixin-sdk/index");
const { config } = require("../out/config");
const { guid } = require("maishu-chitu-service");

let weixinSDK = new WeiXinSDK();
Object.assign(weixinSDK.config, config.weixin);

exports.weixinSDK = weixinSDK;