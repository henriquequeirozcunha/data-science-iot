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

const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://localhost:1883");

//exports.mqttClient = function() {
const mqttClient = function() {
    console.log("Connecting to MQTT Client");
    client.on("connect", ack => {
        console.log("MQTT Client Connected!");

        client.on("message", (topic, message) => {
            console.log(`MQTT Client Message.  Topic: ${topic}.  Message: ${message.toString()}`);
        });
    });

    client.on("error", err => {
        console.log(err);
    });
}; // <-- semicolon added here

(async function () {
  try {
    await startBroker();
    await mqttClient();
  } catch (e) {
    console.error("ERROR: ", e);
    process.exit();
  }
})();