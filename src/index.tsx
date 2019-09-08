import { startServer } from "maishu-node-mvc";
import { config } from "./confg";
import * as path from "path";

startServer({
    port: config.port,
    controllerDirectory: path.join(__dirname, "controllers"),
})