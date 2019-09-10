

import NodeCache = require("node-cache");
import { WeiXinRequest } from "./weixin-request";
import { MCH } from "./mch";
import { Config, ConfigReader } from "./common";
import { errors } from "./errors";
const myCache = new NodeCache();


export class WeiXinSDK {

    mch: MCH;
    config: Config = {};
    cr: ConfigReader;

    constructor() {

        this.cr = new ConfigReader(this.config);
        this.mch = new MCH(this.cr);
    }
    /**
     * 
     * @param appid 第三方用户唯一凭证
     * @param secret 第三方用户唯一凭证密钥，即appsecret
     * @param fromCache 是否从缓存读取,默认为 true
     */
    async token(fromCache?: boolean) {

        let appid: string = this.cr.getAppId();
        let secret: string = this.cr.getAppKey();

        fromCache = fromCache == null ? true : fromCache;

        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
        type Result = { access_token: string, expires_in: number };
        let r: Result;

        if (fromCache) {
            r = myCache.get(appid);
        }

        if (r == null) {
            r = await WeiXinRequest.get<Result>(url);
            myCache.set(appid, r, r.expires_in);
        }

        return r;
    }

    async access_token(code: string) {
        
        if (!code) throw errors.argumentNull("code");

        let appid = this.cr.getAppId();
        let secret = this.cr.getAppKey();
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
        type Result = { access_token: string, expires_in: number, refresh_token: string, openid: string, scope: string };
        return WeiXinRequest.get<Result>(url)
    }
}


