import { Service } from "maishu-chitu-service";
import xmljs = require('xml-js');
import fetch from "node-fetch"
import { errors } from "./errors";

const SUCCESS_NUM = 0;
const SUCCESS_STR = "SUCCESS";

var service = new Service();

export class WeiXinRequest {

    static async get<T>(url: string, args?: object) {
        type ResponseError = { errcode: number | string, errmsg: string };
        let r = await service.get(url, args);
        let err = r as ResponseError;
        if (err.errcode != null && err.errcode != SUCCESS_NUM) {
            let error: Error = { name: `${err.errcode}`, message: err.errmsg };
            return Promise.reject(error);
        }

        return r as T;
    }

    static async postByXML<T>(url: string, args?: object): Promise<T> {
        args = args || {};
        var options = { compact: true };
        let xml = xmljs.json2xml(JSON.stringify(args), options);
        let body = `<xml>${xml}</xml>`;

        return fetch(url, { body, method: "post" })
            .then(r => {
                return r.text();
            })
            .then(text => {

                let isXML = text.startsWith("<xml>") && text.endsWith("</xml>");
                if (!isXML) {
                    return Promise.resolve(text as any as T);
                }
          
                let json: string = xmljs.xml2json(text, { compact: true });

                let obj = JSON.parse(json);
                if (obj["xml"] == null)
                    return Promise.reject(errors.responseFormatError(text))

                obj = obj["xml"];
                let names = Object.getOwnPropertyNames(obj);
                for (let i = 0; i < names.length; i++) {
                    let name = names[i];
                    obj[name] = obj[name]["_cdata"] ? obj[name]["_cdata"] : obj[name];
                }

                type Result = { return_code: string, return_msg: string };
                if ((obj as Result).return_code != SUCCESS_STR) {
                    // console.log("=========================================")
                    // console.log(obj)
                    // console.log("=========================================")
                    let err: Error = { name: obj.return_code || "unknown", message: obj.return_msg || obj.retmsg || "unknown" };
                    return Promise.reject(err)
                }

                return obj as any as T;
            })

    }
}