
import { controller, action, Controller, routeData } from "maishu-node-mvc";
import { request } from "maishu-node-mvc/dist/attributes";
import http = require("http");
import { config } from "../config";

@controller("/auth")
export class AuthController extends Controller {
    @action()
    callback(@routeData { code }) {
        return code;
    }

    @action()
    code(@request request: http.IncomingMessage) {
        request.url;
        let callbackURL = encodeURIComponent(`${config.baseURL}/auth/callback`);
        let scope: "snsapi_base" | "snsapi_userinfo" = "snsapi_base";
        let targetURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.weixin.appid}&redirect_uri=${callbackURL}&response_type=code&scope=${scope}#wechat_redirect`
        return this.redirect(targetURL);
    }
}