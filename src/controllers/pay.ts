import { action, controller } from "maishu-node-mvc";
import { wx } from "../common";
import { request, routeData } from "maishu-node-mvc/dist/attributes";
import http = require("http");
import { errors } from "../error";
import { parseXMLToJSON } from "../lib/weixin-sdk";
import { PaymentMessage, sendMessage } from "../lib/messanger";

interface WeiXinPayment {
    openid: string
    trade_type: string
    cash_fee_type: string
    nonce_str: string
    attach: string
    cash_fee: string
    out_trade_no: string
    total_fee: string
    transaction_id: string
}

interface Attach {
    userId: string,
    applicationId: string,
}

@controller("pay")
export class PayController {
    @action()
    async prepayid(@routeData { order, openId }: { order: Order, openId: string }) {
        if (!order) throw errors.routeDataFieldNull("order");
        if (!openId) throw errors.routeDataFieldNull("openId");

        //oYHEKuMV8Kt0QLBIMjmZfxoWwsjU
        let attach: Attach = { userId: order.CustomerId, applicationId: order.ApplicationId };
        let r = await wx.mch.unifiedorder({
            openid: openId, body: "body", notify_url: "http://web.alinq.cn/weixin/pay/notify",
            out_trade_no: order.Id, total_fee: order.Sum, attach: JSON.stringify(attach)
        })

        return r;
    }

    @action()
    async notify(@request req: http.IncomingMessage) {

        let data = "";
        req.on("data", chunk => {
            data = data + chunk;
        });
        req.on("end", async () => {
            // console.log("=== data ========================")
            // console.log(data);
            // console.log("==================================")

            this.sendPaidMessage(data);
        })
    }

    async sendPaidMessage(xml: string) {
        let obj: WeiXinPayment = await parseXMLToJSON(xml.trim());
        if (!obj.attach)
            throw errors.attachFieldRequired();

        let attach: Attach = JSON.parse(obj.attach);
        let msg: PaymentMessage = {
            PaymentType: "WeiXin",
            Amount: Number.parseInt(obj.total_fee) / 100,
            TargetId: obj.out_trade_no,
            PaymentId: obj.transaction_id,
            UserId: attach.userId,
            ApplicationId: attach.applicationId,
        }

        return sendMessage("PaymentMessage", msg);
    }
}