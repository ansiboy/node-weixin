const { WeiXinSDK } = require("../out/lib/wexin-sdk");
const { config } = require("../out/config");
const { guid } = require("maishu-chitu-service");

let weixinSDK = new WeiXinSDK();
weixinSDK.config.appid = config.weixin.appId;
weixinSDK.config.appkey = config.weixin.appKey;
weixinSDK.config.partnerId = config.weixin.partnerId;
weixinSDK.config.partnerKey = config.weixin.partnerKey;
weixinSDK.config.isSandBox = true;


var assert = require('assert');
describe('Array', function () {
    describe('token', function () {
        it('获取 token', async function () {
            // assert.equal([1, 2, 3].indexOf(4), -1);
            let r = await weixinSDK.token();
            // console.log(r);
            assert.notEqual(r, null);
            assert.notEqual(r.access_token, null);
            assert.notEqual(r.expires_in, null);
        });

        it('token 从缓存读取', async function () {
            let r1 = await weixinSDK.token();
            assert.notEqual(r1, null);
            assert.notEqual(r1.access_token, null);
            assert.notEqual(r1.expires_in, null);

            let r2 = await weixinSDK.token();
            assert.equal(r1.access_token, r2.access_token);
        });

        it('token 不从缓存读取', async function () {
            let r1 = await weixinSDK.token();
            assert.notEqual(r1, null);
            assert.notEqual(r1.access_token, null);
            assert.notEqual(r1.expires_in, null);

            let r2 = await weixinSDK.token(false);
            assert.notEqual(r1.access_token, r2.access_token);
        });
    });
});

describe('mch', function () {
    it('getsignkey', async function () {

        let r = await weixinSDK.mch.getsignkey();
        assert.notEqual(r, null);
        assert.equal(r.return_code, "SUCCESS");
    });


    it("unifiedorder", async function () {
        let r = await weixinSDK.mch.unifiedorder({
            openid: "oYHEKuMV8Kt0QLBIMjmZfxoWwsjU", body: "body", notify_url: "www.163.com",
            out_trade_no: "111111", total_fee: "101"
        });
        assert.notEqual(r, null);
        assert.notEqual(r.prepay_id, null);

    })

    it("micropay", async function () {
        let r = await weixinSDK.mch.micropay({
            body: "付款码支付测试", out_trade_no: guid(),
            total_fee: 1,
        });

        console.log(r)
    })

    it("orderquery", async function () {
        let r = await weixinSDK.mch.orderquery({
            out_trade_no: "111111"
        })

        console.log(r);
    })

    it("downloadbill", async function () {
        let r = await weixinSDK.mch.downloadbill({
            bill_date: "20190909"
        })
        console.log(r);
    })
});