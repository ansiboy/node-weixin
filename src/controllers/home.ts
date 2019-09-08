import { Controller, action, controller } from "maishu-node-mvc";
import { config } from "../config";

@controller()
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
}