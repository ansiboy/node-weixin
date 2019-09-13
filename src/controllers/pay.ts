import { action, controller } from "maishu-node-mvc";
import { wx } from "../common";
import { request, routeData } from "maishu-node-mvc/dist/attributes";
import http = require("http");
import { errors } from "../error";
import { parseXMLToJSON } from "../lib/weixin-sdk";

@controller("pay")
export class PayController {
    @action()
    async prepayid(@routeData { order, openId }: { order: Order, openId: string }) {
        if (!order) throw errors.routeDataFieldNull("order");
        if (!openId) throw errors.routeDataFieldNull("openId");

        //oYHEKuMV8Kt0QLBIMjmZfxoWwsjU
        let r = await wx.mch.unifiedorder({
            openid: openId, body: "body", notify_url: "http://web.alinq.cn/weixin/pay/notify",
            out_trade_no: order.Id, total_fee: order.Sum, detail: JSON.stringify({ order })
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

        let obj = parseXMLToJSON(data);
        console.log(obj);


        //     <xml>
        //     <openid><![CDATA[oYHEKuMV8Kt0QLBIMjmZfxoWwsjU]]></openid>
        //     <trade_type><![CDATA[JSAPI]]></trade_type>
        //     <cash_fee_type><![CDATA[CNY]]></cash_fee_type>
        //     <nonce_str><![CDATA[LTssvNByDg0HFAuVXvBHLk5V2elmbpa1]]></nonce_str>
        //     <time_end><![CDATA[20190909042530]]></time_end>
        //     <err_code_des><![CDATA[SUCCESS]]></err_code_des>
        //     <return_code><![CDATA[SUCCESS]]></return_code>
        //     <mch_id><![CDATA[1236045602]]></mch_id>
        //     <settlement_total_fee><![CDATA[101]]></settlement_total_fee>
        //     <sign><![CDATA[8F0A1D29843B3CD7EAD03078DEC7C003]]></sign>
        //     <cash_fee><![CDATA[101]]></cash_fee>
        //     <is_subscribe><![CDATA[Y]]></is_subscribe>
        //     <return_msg><![CDATA[OK]]></return_msg>
        //     <fee_type><![CDATA[CNY]]></fee_type>
        //     <bank_type><![CDATA[CMC]]></bank_type>
        //     <attach><![CDATA[sandbox_attach]]></attach>
        //     <device_info><![CDATA[sandbox]]></device_info>
        //     <out_trade_no><![CDATA[2b100f84-9366-c3bc-e4f1-82d79270d22c]]></out_trade_no>
        //     <result_code><![CDATA[SUCCESS]]></result_code>
        //     <total_fee><![CDATA[101]]></total_fee>
        //     <appid><![CDATA[wxf1c24c60e3ac13b7]]></appid>
        //     <transaction_id><![CDATA[4818884134620190909042530524464]]></transaction_id>
        //     <err_code><![CDATA[SUCCESS]]></err_code>
        //   </xml>


    }
}