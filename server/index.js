const mqtt = require('mqtt')
const express = require('express')
const morgan = require('morgan');
const app = express()

 

app.use(express.json());
app.use(morgan('dev'));

const clientObj = {};
clientObj.clientId = `mqtt_${Math.random().toString(16).slice(3)}` //Auto gen client ID
clientObj.clean = true;

app.post('/connect', async (req, res) => {

  clientObj.host = await req.body.host;
  clientObj.port = await req.body.port;
  clientObj.password = await req.body.password;
  clientObj.username = await req.body.username;
  clientObj.reconnectionPeriod = await req.body.reconnectionPeriod;
  clientObj.connectionTimeout = await req.body.connectionTimeout;

  res.send('ok')

})
console.log(clientObj)

const connectUrl = `mqtt://${clientObj.host}:${clientObj.port}`

const client = mqtt.connect(connectUrl, clientObj)


let qos = {
  l1:0,
  l2:1,
  l3:2  
}

let topic = {
  top1: 'example/school/shs/bschool',
  top2: 'example/school/shs/gschool',
  top3: 'example/school',
}


//This is to connect to a broker
client.on('connect', () => {
console.log('Connected to Broker')

client.subscribe(topic, {qos: qos.l1}, (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log(`Subscribe was subscribe`)
    }
})
//Publishing to a topic
client.publish(topic.top1, "This is rexford's pub",{qos:0, return: false}, (error) =>{
if(error){
  console.log(error)
}
})

// client.on('message', (topic, payload) => {
//   console.log('Received Message:', topic, payload.toString())
// })
client.on('close',  () => {
    console.log('Disconnected')
  })

})

//Client unsubscription 
// client.unsubscribe(topic.top1, (error)=>{
//   if(error){
//       console.log(error)
//   }else {
//       console.log('Successfully Unsubscribe')
//   }
// })
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

