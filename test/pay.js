const { guid } = require("maishu-chitu-service");
const { weixinSDK } = require("./common");


var assert = require('assert');
describe('Array', function() {
    describe('token', function() {
        it('获取 token', async function() {
            // assert.equal([1, 2, 3].indexOf(4), -1);
            let r = await weixinSDK.token();
            // console.log(r);
            assert.notEqual(r, null);
            assert.notEqual(r.access_token, null);
            assert.notEqual(r.expires_in, null);
        });

        it('token 从缓存读取', async function() {
            let r1 = await weixinSDK.token();
            assert.notEqual(r1, null);
            assert.notEqual(r1.access_token, null);
            assert.notEqual(r1.expires_in, null);

            let r2 = await weixinSDK.token();
            assert.equal(r1.access_token, r2.access_token);
        });

        it('token 不从缓存读取', async function() {
            let r1 = await weixinSDK.token();
            assert.notEqual(r1, null);
            assert.notEqual(r1.access_token, null);
            assert.notEqual(r1.expires_in, null);

            let r2 = await weixinSDK.token(false);
            assert.notEqual(r1.access_token, r2.access_token);
        });
    });
});

describe('mch', function() {
    it('getsignkey', async function() {

        let r = await weixinSDK.mch.getsignkey();
        assert.notEqual(r, null);
        assert.equal(r.return_code, "SUCCESS");
    });


    it("unifiedorder", async function() {

        let order = {
            "Id": "04b35f8e-00f9-41f6-a602-4fe33ebec9a2",
            "Consignee": "mai shu",
            "CustomerId": "240f103f-02a3-754c-f587-db122059fdfb",
            "CouponDiscount": 0,
            "CouponTitle": "",
            "OrderDate": "2019-09-13T15:23:44.000Z",
            "Serial": "20190913232344",
            "Invoice": null,
            "ReceiptAddress": "云南省 丽江市 古城区 油城三路267号大院402房 联系人：mai shu 联系电话：18502146746 ",
            "ReceiptRegionId": "a5e3ab15-6db6-4f24-9eb4-ce3d35baf984",
            "Remark": "",
            "StatusText": "待付款",
            "Status": "WaitingForPayment",
            "BalanceAmount": 0,
            "Amount": 25.5,
            "Discount": 0,
            "Sum": 25.51,
            "Freight": 0.01,
            "OrderDetails": [{
                "Price": 25.5,
                "ProductId": "86a61a48-55c4-4622-8c53-d299f5da0599",
                "ProductName": "灰熊",
                "Unit": "件",
                "Score": null,
                "ImageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAFBElEQVR4Xu2ZzyttYRSG1y3FREgIyQAxMDAwkMRA/mjJgAnJ0IBQfiSMKClK3dvatc/9uM65t1W33n3Ws0cn56xtref9nrP3t8+P19fXn8YBAQh8S+AHgrAyINCeAIKwOiDQgQCCsDwggCCsAQjECHAFiXGjKgkBBEkSNGPGCCBIjBtVSQggSJKgGTNGAEFi3KhKQgBBkgTNmDECCBLjRlUSAgiSJGjGjBFAkBg3qpIQQJAkQTNmjACCxLhRlYQAgiQJmjFjBBAkxo2qJAQQJEnQjBkjgCAxblQlIYAgSYJmzBgBBIlxoyoJAQRJEjRjxgggSIwbVUkIIEiSoBkzRgBBYtyoSkIAQZIEzZgxAggS40ZVEgIIkiRoxowRQJAYN6qSEECQJEEzZowAgsS4UZWEAIIkCZoxYwQQJMaNqiQEECRJ0IwZI4AgMW5UJSGAIEmCZswYAQSJcaMqCQEESRI0Y8YIIEiMG1VJCCBIkqAZM0YAQWLcqEpCAEGSBM2YMQIIEuNGVRICCJIkaMaMEUCQGDeqkhBAkCRBM2aMAILEuFGVhACCJAmaMWMEECTGjaokBBAkSdCMGSPQCEHu7+/t/Pzc1tfXY1NSBYEgAWlB3t/fbWdnx56fn1vj9fX12ejoqN3c3LT+trCwYPPz87a9vW1vb2/fohgcHLStrS27vb21w8PDjrhWVlZsdnbWXl5e7OjoyNbW1qy3t7eq2d/ft7m5ORsfHw8ip6xJBKQFcZC+SE9OTmxkZKTi6gv3+PjYfMH763ZHu4V8cXFRCbe8vFydxw9/XR/luRGkSUv5//QqL4gv6PIb38UYHh62y8vLFpH66lB/y/sbBwcHtri4aP39/Z/I1YJMTk7a3t6efXx8tN73q8LAwEBLPgT5P4uuSWeVFuS7Wyxf8H6btbq6ao+Pj62rwe7urvlepdPhAkxPT1dy+eL3Y2lpycbGxipZNjY27Ozs7JMg/3LbVorZpPDp9e8EpAUp2/dv/vqob5HK26Xys5029V7jgjw9PX26enh9T0+PDQ0N2czMTNs9yN+R8oluItAIQb7eZpUB+Aa93EP4e/X+4+rq6o/brFIqf+17Dr9y1Jvucg/ion29DfPzf/c/u2lRMMtvAl0niC/66+tr29zc/LQPKTf7fgXyfUu5t6kXfSlIea4aWburFouqOwk0RpD6turrbVf5d1/cDw8P1eNc3xeUG/X6tmtiYqK1b/FzuTi+z/DNul9J7u7uKnmmpqaqR8wuTvm0DEG6U4R2UzVGkHa/XdTf/L5J9ydQXx/Znp6etmb33zf8+JffQfxz9ZWok5S5lku+aRshSL5YmFiFAIKoJEEfkgQQRDIWmlIhgCAqSdCHJAEEkYyFplQIIIhKEvQhSQBBJGOhKRUCCKKSBH1IEkAQyVhoSoUAgqgkQR+SBBBEMhaaUiGAICpJ0IckAQSRjIWmVAggiEoS9CFJAEEkY6EpFQIIopIEfUgSQBDJWGhKhQCCqCRBH5IEEEQyFppSIYAgKknQhyQBBJGMhaZUCCCIShL0IUkAQSRjoSkVAgiikgR9SBJAEMlYaEqFAIKoJEEfkgQQRDIWmlIhgCAqSdCHJAEEkYyFplQIIIhKEvQhSQBBJGOhKRUCCKKSBH1IEkAQyVhoSoUAgqgkQR+SBBBEMhaaUiGAICpJ0IckAQSRjIWmVAggiEoS9CFJAEEkY6EpFQK/AGIV1jskycsTAAAAAElFTkSuQmCC",
                "Quantity": 1
            }]
        }


        let r = await weixinSDK.mch.unifiedorder({
            openid: "oYHEKuMV8Kt0QLBIMjmZfxoWwsjU",
            body: "body",
            notify_url: "www.163.com",
            out_trade_no: "111111",
            total_fee: "101",
        });
        assert.notEqual(r, null);
        assert.notEqual(r.prepay_id, null);

    })

    it("micropay", async function() {
        let r = await weixinSDK.mch.micropay({
            body: "付款码支付测试",
            out_trade_no: guid(),
            total_fee: 1,
        });

        console.log(r)
    })

    it("orderquery", async function() {
        let r = await weixinSDK.mch.orderquery({
            out_trade_no: "111111"
        });

        // console.log(r);
    })

    it("downloadbill", async function() {
        let r = await weixinSDK.mch.downloadbill({
            bill_date: "20190909"
        });
        // console.log(r);
    })
});