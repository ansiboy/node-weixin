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

export function getMD5Sign(key: string, params: { [key: string]: string }) {
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
    appid?: string
    appkey?: string
    partnerId?: string
    partnerKey?: string,
    isSandBox?: boolean,
}

export class ConfigReader {
    private config: Config;
    private sandboxPartnerKey: any;
    constructor(config: Config) {
        this.config = config;
    }

    getIsSandBox() {
        if (this.config.isSandBox != null)
            return this.config.isSandBox;

        return false;
    }

    getAppId() {
        if (!this.config.appid)
            throw errors.AppIdIsNull();

        return this.config.appid;
    }

    getAppKey() {
        if (!this.config.appkey)
            throw errors.AppKeyNull();

        return this.config.appkey;
    }


    getParanerId() {
        if (!this.config.partnerId)
            throw errors.partnerIdIsNull();

        return this.config.partnerId;
    }


    getParanerKey() {
        if (!this.config.partnerKey)
            throw errors.partnerKeyIsNull();

        return this.config.partnerKey;
    }

}