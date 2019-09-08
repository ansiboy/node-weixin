import { action, controller } from "maishu-node-mvc";
import { wx } from "../common";

@controller("pay")
export class PayController {
    @action()
    async prepayid() {
        let r = await wx.mch.unifiedorder({
            openid: "oYHEKuMV8Kt0QLBIMjmZfxoWwsjU", body: "body", notify_url: "www.163.com",
            out_trade_no: "111111", total_fee: "101"
        })

        return r;
    }
}