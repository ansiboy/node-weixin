import { Controller, action, controller, routeData } from "maishu-node-mvc";
import { config } from "../config";
import { wx } from "../common";

@controller("/")
export class HomeController extends Controller {
    @action("/")
    index() {
        return "Index Page";
    }

    @action()
    config() {
        let { appId, partnerId } = config.weixin;
        return { appId, partnerId };
    }

    @action()
    async paySign(@routeData args) {
        let r = await wx.mch.paySign(args);
        return r;
    }
}