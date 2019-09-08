import { action, controller } from "maishu-node-mvc";
import { wx } from "../common";
import { guid } from "maishu-chitu-service";
import { request } from "maishu-node-mvc/dist/attributes";
import http = require("http");

@controller("pay")
export class PayController {
    @action()
    async prepayid() {
        //oYHEKuMV8Kt0QLBIMjmZfxoWwsjU
        let r = await wx.mch.unifiedorder({
            openid: "oYHEKuMV8Kt0QLBIMjmZfxoWwsjU", body: "body", notify_url: "http://web.alinq.cn/weixin/pay/notify",
            out_trade_no: guid(), total_fee: 101
        })

        return r;
    }

    @action()
    async notify(@request req: http.IncomingMessage) {

        let data = "";
        req.on("data", chunk => {
            data = data + chunk;
        });
        req.on("end", () => {
            console.log("=== data ========================")
            console.log(data);
            console.log("==================================")
        })

        console.log("notify");

    }
}