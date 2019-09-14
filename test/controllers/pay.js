const { PayController } = require("../../out/controllers/pay");

let ctrl = new PayController();

describe('mch', function() {
    it('send payment message', async function() {
        let xml = `<xml>
        <openid><![CDATA[oYHEKuMV8Kt0QLBIMjmZfxoWwsjU]]></openid>
        <trade_type><![CDATA[JSAPI]]></trade_type>
        <cash_fee_type><![CDATA[CNY]]></cash_fee_type>
        <nonce_str><![CDATA[2DGSHOxyYd629epIWmNTK6KmkiRWHpog]]></nonce_str>
        <time_end><![CDATA[20190914103441]]></time_end>
        <err_code_des><![CDATA[SUCCESS]]></err_code_des>
        <return_code><![CDATA[SUCCESS]]></return_code>
        <mch_id><![CDATA[1236045602]]></mch_id>
        <settlement_total_fee><![CDATA[101]]></settlement_total_fee>
        <sign><![CDATA[D05B1A90BC8255A7C8DF9C88999B007F]]></sign>
        <cash_fee><![CDATA[101]]></cash_fee>
        <is_subscribe><![CDATA[Y]]></is_subscribe>
        <return_msg><![CDATA[OK]]></return_msg>
        <fee_type><![CDATA[CNY]]></fee_type>
        <bank_type><![CDATA[CMC]]></bank_type>
        <attach><![CDATA[{"userId":"3f5b824f-26c4-46a5-86ba-25f020462052","applicationId":"7bbfa36c-8115-47ad-8d47-9e52b58e7efd"}]]></attach>
        <device_info><![CDATA[sandbox]]></device_info>
        <out_trade_no><![CDATA[0022956f-5219-4d25-a772-b7cecb6f902e]]></out_trade_no>
        <result_code><![CDATA[SUCCESS]]></result_code>
        <total_fee><![CDATA[101]]></total_fee>
        <appid><![CDATA[wxf1c24c60e3ac13b7]]></appid>
        <transaction_id><![CDATA[4405731699420190914103441859684]]></transaction_id>
        <err_code><![CDATA[SUCCESS]]></err_code>
      </xml>`;
        ctrl.sendPaidMessage(xml);
    });
})