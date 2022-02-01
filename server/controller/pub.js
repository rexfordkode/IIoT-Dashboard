let mosca = require('mosca')
let settings = {
    port: 1884
}
let broker = new mosca.Server(settings)

broker.on('ready', ()=>{
    console.log("Broker is ready")
})


// Publication  
let mqtt = require('mqtt')
let client = mqtt.connect('mqtt://localhost:1884')
let topic = 'test/me'

client.on('message',(topic, message) =>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})

//Subscription
