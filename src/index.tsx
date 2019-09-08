import { startServer } from "maishu-node-mvc";
import { config } from "./config";
import * as path from "path";
import { PayController } from "./controllers/pay";
import { wx } from "./common";


// let ctrl = new PayController();
// debugger
// ctrl.prepayid().catch(err => {
//     console.log(err)
// });

// debugger
// wx.mch.downloadbill({ bill_date: "20190909" })

startServer({
    port: config.port,
    controllerDirectory: path.join(__dirname, "controllers"),
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type, application-id, token, UserId, *'
    }
})
