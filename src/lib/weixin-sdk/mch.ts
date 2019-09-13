import { WeiXinRequest } from "./weixin-request";
import { getNonceStr, getMD5Sign, ConfigReader } from "./common";

export class MCH {

    private static baseURL = "https://api.mch.weixin.qq.com";
    private static sandboxBaseURL = "https://api.mch.weixin.qq.com/sandboxnew";

    private sandboxPartnerKey: string;
    private cr: ConfigReader;

    constructor(configReader: ConfigReader) {
        this.cr = configReader;
    }

    private url(path: string) {
        if (this.cr.getIsSandBox()) {
            return `${MCH.sandboxBaseURL}/${path}`;
        }

        return `${MCH.baseURL}/${path}`;
    }

    private async getsignkey() {

        let partnerId: string = this.cr.getParanerId();
        let partnerKey: string = this.cr.getParanerKey();

        let url = this.url("pay/getsignkey");

        let nonce_str = getNonceStr();
        let sign = getMD5Sign(partnerKey, { mch_id: partnerId, nonce_str });
        let args = { sign, mch_id: partnerId, nonce_str };

        type Result = { return_code: string, return_msg: string, sandbox_signkey: string }
        let obj = await WeiXinRequest.postByXML<Result>(url, args);
        return obj as Result;
    }

    async paySign(args: { [key: string]: string }) {
        let key = this.cr.getAppKey();
        let sign = getMD5Sign(key, args);
        return sign;
    }


    async unifiedorder(args: {
        openid: string, body: string, notify_url: string,
        out_trade_no: string, total_fee: number, detail?: string,
        attach?: string
    }): Promise<{ prepay_id: string | number }> {

        let url = this.url("pay/unifiedorder");
        let nonce_str = getNonceStr();
        let spbill_create_ip = "127.0.0.1";
        let parameterValue2 = "JSAPI";

        args["appid"] = this.cr.getAppId();
        args["mch_id"] = this.cr.getParanerId();
        args["nonce_str"] = nonce_str;
        args["trade_type"] = parameterValue2;
        args["spbill_create_ip"] = spbill_create_ip;
        if (this.cr.getIsSandBox()) {
            args.total_fee = 101;
        }

        let key = await this.getParanerKey();
        let sign = getMD5Sign(key, args);
        args["sign"] = sign;


        type Result = { prepay_id: string };
        let obj = await WeiXinRequest.postByXML<Result>(url, args);
        return obj as Result;
    }

    async micropay(args: { body: string, out_trade_no: string, total_fee: number }) {
        let url = this.url("pay/micropay");
        args["appid"] = this.cr.getAppId();
        args["mch_id"] = this.cr.getParanerId();
        args["nonce_str"] = getNonceStr();
        args["spbill_create_ip"] = "8.8.8.8";
        args["auth_code"] = "120061098828009406";

        let key = await this.getParanerKey();
        let sign = getMD5Sign(key, args);
        args["sign"] = sign;
        //sign


        type Result = {};
        let obj = await WeiXinRequest.postByXML<Result>(url, args);
        return obj;
    }

    async orderquery(args: { out_trade_no: string }) {
        let url = this.url("pay/orderquery");
        args["appid"] = this.cr.getAppId();
        args["mch_id"] = this.cr.getParanerId();
        args["nonce_str"] = getNonceStr();

        let key = await this.getParanerKey();
        let sign = getMD5Sign(key, args);
        args["sign"] = sign;

        let obj = await WeiXinRequest.postByXML(url, args);
        return obj;
    }

    async downloadbill(args: { bill_date: string, bill_type?: string, tar_type?: string }) {
        args["appid"] = this.cr.getAppId();
        args["mch_id"] = this.cr.getParanerId();
        args["nonce_str"] = getNonceStr();
        args.bill_type = "ALL";

        let key = await this.getParanerKey();
        args["sign"] = getMD5Sign(key, args);

        let url = this.url("pay/downloadbill");
        let obj = await WeiXinRequest.postByXML(url, args);
        return obj;
    }

    private async getParanerKey() {
        if (this.cr.getIsSandBox() == false)
            return this.cr.getParanerKey();

        if (!this.sandboxPartnerKey) {
            let r = await this.getsignkey();
            this.sandboxPartnerKey = await r.sandbox_signkey;
        }

        return this.sandboxPartnerKey;
    }

}