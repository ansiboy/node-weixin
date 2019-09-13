import CryptoJS = require("crypto-js");
import { errors } from "./errors";

export function getNonceStr() {
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var noceStr = "";
    for (let i = 0; i < 32; i++) {
        noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    // oldNonceStr = noceStr;
    return noceStr;
}

export function getMD5Sign(key: string, params: { [key: string]: string | number }) {
    let names = Object.getOwnPropertyNames(params);
    names.sort((a, b) => a < b ? -1 : 1);
    let str = names.map(o => o + "=" + params[o]).join("&") + "&key=" + key;
    let r = CryptoJS.MD5(str).toString().toUpperCase();
    return r;
}


function getTimeStamp() {
    var timestamp = new Date().getTime();
    var timestampstring = timestamp.toString();//一定要转换字符串
    return timestampstring;
}

function getPackage(partnerId: string, partnerKey: string, params: { [key: string]: string }) {

    console.assert(params["key"] == undefined);
    params["key"] = partnerKey;

    let names = Object.getOwnPropertyNames(params);
    names.sort((a, b) => a < b ? -1 : 1);

    let signString = names.map(o => `${o}=${params[o]}`).join("&");
    let md5SignValue = ("" + CryptoJS.MD5(signString)).toUpperCase();

    let completeString = names.map(o => `${o}=${encodeURIComponent(params[o])}`) + "&sign=" + md5SignValue;;
    return completeString;
}

export interface Config {
    appId?: string
    appKey?: string
    partnerId?: string
    partnerKey?: string,
    isSandBox?: boolean,
    miniAppId?: string,
    miniAppKey?: string,
}

export class ConfigReader {
    private config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    getIsSandBox() {
        if (this.config.isSandBox != null)
            return this.config.isSandBox;

        return false;
    }

    getAppId() {
        if (!this.config.appId)
            throw errors.configFieldNull("appId");

        return this.config.appId;
    }

    getAppKey() {
        if (!this.config.appKey)
            throw errors.configFieldNull("appKey");

        return this.config.appKey;
    }


    getParanerId() {
        if (!this.config.partnerId)
            throw errors.configFieldNull("partnerId");

        return this.config.partnerId;
    }


    getParanerKey() {
        if (!this.config.partnerKey)
            throw errors.configFieldNull("partnerKey");

        return this.config.partnerKey;
    }

    getMiniAppId() {
        console.log(this.config)
        if (!this.config.miniAppId)
            throw errors.configFieldNull("miniAppId");

        return this.config.miniAppId;
    }

    getMiniAppKey() {
        console.log(this.config)
        if (!this.config.miniAppKey)
            throw errors.configFieldNull("miniAppKey");

        return this.config.miniAppKey;
    }

}