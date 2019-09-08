
import { controller, action, Controller, routeData } from "maishu-node-mvc";
import { request } from "maishu-node-mvc/dist/attributes";
import http = require("http");
import { config } from "../confg";

@controller("/auth")
export class AuthController extends Controller {
    @action()
    callback(@routeData { code }) {
        return this.redirect("http://www.163.com")
    }

    @action()
    code(@request request: http.IncomingMessage) {
        // return this.redirect("http://www.163.com")
        request.url;
        let host = request.headers["host"];
        let callbackURL = encodeURIComponent(`http://${host}/auth/callback`);
        let scope: "snsapi_base" | "snsapi_userinfo" = "snsapi_base";
        let targetURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${callbackURL}&response_type=code&scope=${scope}#wechat_redirect`
        return this.redirect(targetURL);
    }
}