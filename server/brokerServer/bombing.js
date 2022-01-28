const mqtt = require('mqtt')


//Variables for connecting to a broker url
const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {clean: true}, {keepalive: 0 })
const interval = 5000

let sent = 0

const  count = () => {
  console.log('sent/s', sent / interval * 1000)
  sent = 0
}

setInterval(count, interval)

const  publish =()=> {
  sent++
  client.publish('test', 'payload', { qos: 1 }, publish)
}

client.setMaxListeners(100)

client.on('connect',   () {
  for (let i = 0; i < 50; i++) {
    publish()
  }
})

client.on('offline', () =>{
  console.log('offline')
})

client.on('error', () =>{
  console.log('reconnect!')
  client.stream.end()
})