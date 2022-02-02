const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors())

const aedes = require('aedes')();
const server = require('aedes-server-factory').createServer(aedes, {
    ws: true,
    mqtt:true,
    tcp:false,
  });
const brokerPort = 1883;
const port = process.env.PORT || '5000'

//Broker Starter API
app.post('/broker',(res, req) =>{
    server.listen(brokerPort, function () {
      res.send({message:`MQTT Broker running on port: ${brokerPort}`});
    });
})
app.use(express.static(path.join(__dirname, '/client/build')));
if(process.env.MODE_ENV==='production'){
    // Serve any static files
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
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
    console.log(`TOPIC_SUBSCRIBED] Client ${(client ? client.id : client)} subscribed to topics: ${subscriptions.map(s => s.topic).join(',')} on broker ${aedes.id}`)
})

// emitted when a client unsubscribes from a message topic
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log(`[TOPIC_UNSUBSCRIBED] Client ${(client ? client.id : client)} unsubscribed to topics: ${subscriptions.join(',')} from broker ${aedes.id}`)
})

// emitted when a client publishes a message packet on the topic
aedes.on('publish', async function (packet, client) {
    if (client) {
        console.log(`[MESSAGE_PUBLISHED] Client ${(client ? client.id : 'BROKER_' + aedes.id)} has published message on ${packet.topic} to broker ${aedes.id}`)
    }
})


