const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const PORT = 5000;
const mqtt = require('mqtt')
const mqttBench = require('mqtt-benchmark')
const stats = require('aedes-stats');
const { default: aedesMemoryPersistence } = require('aedes-persistence');


const aedes = require('aedes')();
// const instance = aedes()

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
      
    });
    res.send({message:`MQTT Broker running on port: ${brokerPort}`});
})
app.use(express.static(path.join(__dirname, '/client/build')));


aedes.on('publish', async  (packet, client)=> {
    if (client) {
        console.log(`The message published Client ${(client ? client.id : 'BROKER_' + aedes.id)} has published message on ${packet.topic} to broker ${aedes.id} ${client.stats}`)
    }
})

// mqttBench.console()

//The bellow code listen to port and can also start the broker on the call back function
app.listen(port, ()=> {
  console.log('server started')
  server.listen(brokerPort, function () {
    console.log('Broker started')
  });
})


