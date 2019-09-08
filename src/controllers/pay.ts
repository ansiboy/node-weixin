import { action, controller } from "maishu-node-mvc";
import { wx } from "../common";
import { guid } from "maishu-chitu-service";

@controller("pay")
export class PayController {
    @action()
    async prepayid() {
        //oYHEKuMV8Kt0QLBIMjmZfxoWwsjU
        let r = await wx.mch.unifiedorder({
            openid: "oYHEKuMV8Kt0QLBIMjmZfxoWwsjU", body: "body", notify_url: "www.163.com",
            out_trade_no: guid(), total_fee: 101
        })

        return r;
    }

    @action()
    async notify() {
        console.log("notify");
        
    }
}