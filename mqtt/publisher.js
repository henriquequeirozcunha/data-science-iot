const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

// exports.startBroker = function() {
const startBroker = function() {
    return new Promise((res, rej) => {
        server.listen(port, function () {
            console.log(`MQTT Broker started on port ${port}`);
            return res()
        });
    })
};

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')
var interval = setInterval( function() {
sendData()
},2000)
client.on('message', () => {
console.log('message')
})
function sendData()
{
console.log('publishing')
// COMPLETE COM O CÓDIGO NECESSÁRIO PARA PUBLICAR O DADO
//ALEATORIO UTILIZANDO O TOPICO sensores/voltagem
console.log('published')
}
function randomInt (low, high) {
return Math.floor(Math.random() * (high - low) + low);
}


(async function () {
    try {
      await startBroker();
      await mqttClient();
    } catch (e) {
      console.error("ERROR: ", e);
      process.exit();
    }
  })();