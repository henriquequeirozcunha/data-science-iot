var WebSocketServer = require('ws').Server;
var webSocket = require('ws').webSocket;
const PORT = 8080;
const PATH = '/mqtt_websocket';

wss = new WebSocketServer({port: PORT, path: PATH});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Mensagem do servidor: %s ', message);
        console.log('Protocolo: %s ', ws.protocol);
        ws.send('Echo: ' + message);
    });
    console.log('new connection');

    var internal = setInterval( function(){
        if(ws.readyState == ws.OPEN){
            ws.send('data: ' + randomInt(1, 10));
        }
    }, 2000);
});

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};