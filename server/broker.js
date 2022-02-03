const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const PORT = 5000;
const mqtt = require('mqtt')
const mqttcon = require('mqtt-connection')
const mqttBench = require('mqtt-benchmark')
const stats = require('aedes-stats')


const aedes = require('aedes')();
const instance = aedes()
const server = require('aedes-server-factory').createServer(aedes, {
    ws: true,
    mqtt:true,
    tcp:true,
  });
const brokerPort = 1883;
const port = process.env.PORT || '5000'
app.use(cors())

app.use(express.json())

//Broker Starter API
app.get('/broker',(req, res) =>{
  // console.log(req.body);
  // const {brokerPort} = req.body;
    server.listen(brokerPort, function () {
      console.log('Broker started')
      // 
    });
    res.send({message:`MQTT Broker running on port: ${brokerPort}`});
})
app.use(express.static(path.join(__dirname, '/client/build')));

// emitted when a client connects to the broker
aedes.on('client', function (client) {
    console.log(`User coneected Client ${(client ? client.id : client)} connected to broker ${aedes.id}`)
})

// emitted when a client disconnects from the broker
aedes.on('clientDisconnect', function (client) {
    console.log(`Client Disconnected with ID ${(client ? client.id : client)} disconnected from the broker ${aedes.id}`)
})

// emitted when a client subscribes to a message topic
aedes.on('subscribe', function (subscriptions, client) {
    console.log(`Topic Subscribe Client ${(client ? client.id : client)} subscribed to topics: ${subscriptions.map(s => s.topic).join(',')} on broker ${aedes.id}`)
})

// emitted when a client unsubscribes from a message topic
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log(`Topic Unsubscribe Client ${(client ? client.id : client)} unsubscribed to topics: ${subscriptions.join(',')} from broker ${aedes.id}`)
})

// emitted when a client publishes a message packet on the topic
aedes.on('publish', async function (packet, client) {
    if (client) {
        console.log(`The message published Client ${(client ? client.id : 'BROKER_' + aedes.id)} has published message on ${packet.topic} to broker ${aedes.id}`)
    }
})

setInterval(()=>{
  console.log(stats(aedes,))
}, 3000)
// mqttBench.console()

app.listen(port, ()=> console.log('server started'))


