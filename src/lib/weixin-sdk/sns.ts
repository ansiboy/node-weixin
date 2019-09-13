//https://api.weixin.qq.com/sns/jscode2session

import { WeiXinRequest } from "./weixin-request";
import { ConfigReader } from "./common";

export class SNS {


    private cr: ConfigReader;

    constructor(configReader: ConfigReader) {
        this.cr = configReader;
    }

    private url(path: string) {
        return `https://api.weixin.qq.com/sns/${path}`;
    }

    async jscode2session(code: string) {
        let url = this.url("jscode2session");
        type Result = {
            openid: string, session_key: string, unionid: string,
            errcode: string, errmsg: string
        };
        let r = await WeiXinRequest.get<Result>(url, {
            appid: this.cr.getMiniAppId(), secret: this.cr.getMiniAppKey(),
            js_code: code, grant_type: "authorization_code"
        })

        return r;
    }
}
