
import { controller, action, Controller, routeData } from "maishu-node-mvc";
import { request } from "maishu-node-mvc/dist/attributes";
import http = require("http");
import { config } from "../config";
import { wx } from "../common";

@controller("/auth")
export class AuthController extends Controller {
    @action()
    async callback(@routeData { code }) {
        if (!code) throw new Error(`route data field code is null or empty.`);
        let r = await wx.access_token(code);

        return r;
    }

    @action()
    code(@request request: http.IncomingMessage) {
        request.url;
        let callbackURL = encodeURIComponent(`${config.baseURL}/auth/callback`);
        let scope: "snsapi_base" | "snsapi_userinfo" = "snsapi_base";
        let appId = config.weixin.appId;
        let targetURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${callbackURL}&response_type=code&scope=${scope}#wechat_redirect`
        return this.redirect(targetURL);
    }
}