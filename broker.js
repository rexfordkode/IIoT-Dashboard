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


//Middleware
app.use(cors())
app.use(express.json())

//This code enable the broker to listen to different 
const server = require('aedes-server-factory').createServer(aedes, {
    ws: true,
    mqtt:true,
    tcp:true,
  });
const brokerPort = 1883;
//process.env.port
//process.env.NODE_ENV => production or undefined
const port = process.env.PORT || '5000'

if(process.env.NODE_ENV ==='production'){
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, '/client/build')));
}
//Broker Starter API
app.get('/broker',(req, res) =>{
    server.listen(brokerPort, function () {
      console.log('Broker started')
      
    });
    res.send({message:`MQTT Broker running on port: ${brokerPort}`});
})



aedes.on('publish', async  (packet, client)=> {
    if (client) {
        console.log(`The message published Client ${(client ? client.id : 'BROKER_' + aedes.id)} has published message on ${packet.topic} to broker ${aedes.id} ${client.stats}`)
    }
})

app.get("*", (req,res)=>{
  
})

//The bellow code listen to port and can also start the broker on the call back function
app.listen(port, ()=> {
  console.log('Server started listing on port'+port)
  server.listen(brokerPort, function () {
    console.log('Broker started listening on port '+brokerPort)
  });
})


