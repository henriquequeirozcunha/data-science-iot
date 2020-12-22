const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

var interval = setInterval( function() {
    sendData();
}, 2000);

client.on('message', () => {
    console.log('message');
});

function sendData(){
    console.log('publishing');
    client.publish('casa/quarto/lampada', 'lampada do quarto: ' + randomInt(110, 220).toString());
    client.publish('casa/quarto/tv', 'tv do quarto: ' + randomInt(110, 220).toString());
    client.publish('casa/sala/lampada', 'lampada da sala: ' + randomInt(110, 220).toString());
    console.log('published');
};

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};