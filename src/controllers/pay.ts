import { action } from "maishu-node-mvc";
import { WeiXinSDK } from "../lib/wexin-sdk";
import { config } from "../config";

export class PayController {
    @action()
    async prepayid() {
        let wx = new WeiXinSDK();
        let w = config.weixin;

        wx.config.isSandBox = true;
        wx.config.partnerId = w.partnerId;
        wx.config.partnerKey = w.partnerKey;
        wx.config.isSandBox = true;

        let r = await wx.mch.unifiedorder({
            openid: "oYHEKuMV8Kt0QLBIMjmZfxoWwsjU", body: "body", notify_url: "www.163.com",
            out_trade_no: "111111", total_fee: "101"
        })

        return r;
    }
}