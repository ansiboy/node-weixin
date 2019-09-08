import { startServer } from "maishu-node-mvc";
import { config } from "./config";
import * as path from "path";
import { PayController } from "./controllers/pay";


// let ctrl = new PayController();
// debugger
// ctrl.prepayid().catch(err => {
//     console.log(err)
// });

startServer({
    port: config.port,
    controllerDirectory: path.join(__dirname, "controllers"),
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    }
})
