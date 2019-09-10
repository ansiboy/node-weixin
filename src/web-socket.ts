
import * as http from "http";
import socketIO = require("socket.io");
export function start(server: http.Server) {
    let io = socketIO(server);
    
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}