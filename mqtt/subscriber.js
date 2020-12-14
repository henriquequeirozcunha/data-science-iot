const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://broker.hivemq.com')

// COMPLETE COM O CÓDIGO NECESSÁRIO PARA RECEBER
//NOTIFICAÇAO DO DADO ATRAVÉS DO TOPICO sensores/voltagem
client.on('connect', () => {
console.log('connected')
})
client.on('message', (topic, message) => {
console.log('received message %s %s', topic, message)
})