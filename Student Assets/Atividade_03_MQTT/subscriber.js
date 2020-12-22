const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

var todosTopicos = ['casa/quarto/lampada', 'casa/quarto/tv', 'casa/sala/lampada'];
client.subscribe(todosTopicos);

client.on('connect', () => {
    console.log('connected');
});

client.on('message', (topic, message) => {
    console.log('received message %s %s', topic, message.toString());
    client.end();
});