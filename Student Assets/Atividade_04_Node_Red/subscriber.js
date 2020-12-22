const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

var todosTopicos = ['casa/quarto/tv', 'casa/quarto/lampada', 'casa/sala/lampada'];
client.subscribe(todosTopicos);

client.on('connect', () => {
    console.log('connected');
});

client.on('message', (topic, message) => {
    console.log('received message %s %s', topic, message.toString());
    client.end();
});