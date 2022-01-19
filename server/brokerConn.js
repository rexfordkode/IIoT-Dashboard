
//This is a configuration with MQTT API
const mqtt = require('mqtt')
let client = mqtt.connect('mqtt://localhost:1883',options)
let username = 'mqtt'
let password = 'password'

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'autogen',
  username: username,
  password: password,
  reconnectPeriond: 10,
  connectTimeout: 30,
  will: {
    topic: '+/temp',
    payload: 'content of the message',
    QoS: 0,
    retain: true 
  }
}

//CLIENT EVENTS CODES

//This is to connect to the broker
client.on('connect', (conack) => {
  console.log('Client connected'+conack)
})

//This is to reconnect
client.on('reconnect', () =>{ console.log('Reconnecting...')})

//This is to disconnect a client from a broker
client.on('disconnect', (packet) =>{ console.log(packet)})

//This is to trigger when the client is disconnected from the broker
client.on('offline', () =>{
  console.log('offline')
})

//This is what the client receive when it received a published message
// Triggered when the client receives a published Payload, which contains
//  three parameters, topic, payload and packet. 
// The topic is the topic of the received message, the payload is the content of the received message, and the packet is the MQTT packet which contains QoS, retain and other information

client.on('message', function (topic, payload, packet) {
  // Payload is Buffer
  console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`)
})

// CLIENT FUNCTIONALITY
// Send a test message with QoS of 0 to the testtopic
client.publish('testtopic', 'Hello, MQTT!', { qos: 0, retain: false },  (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Published')
  }
})

//Subscribe
