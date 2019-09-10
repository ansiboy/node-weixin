import { startServer } from "maishu-node-mvc";
import { config } from "./config";
import * as path from "path";
import { PayController } from "./controllers/pay";
import { wx } from "./common";
import { start as startWebSocket } from "./web-socket";

let { server } = startServer({
    port: config.port,
    controllerDirectory: path.join(__dirname, "controllers"),
    staticRootDirectory: path.join(__dirname, "static"),
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type, application-id, token, UserId, *'
    }
})

startWebSocket(server);

// var app = require('http').createServer(handler)
// var io = require('socket.io')(app);
// var fs = require('fs');

// app.listen(8011);

// function handler (req, res) {

// debugger

//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });
// }

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });


