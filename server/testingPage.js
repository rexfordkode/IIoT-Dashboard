const mqtt = require('mqtt')

const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'mqtt',
  password: '1234',
  reconnectPeriod: 1000,
})

// let topic = 'school/ttu'
let topic = {
      top1: 'example/school/shs/bschool',
      top2: 'example/school/shs/gschool',
      top3: 'example/school',
    }

client.on('connect', () => {
  console.log('Connected successful')

  client.subscribe(topic.top2,(error) => {
    if(error){
      console.log(error)
    }else{
      console.log(`Subscribe to topic '${topic['top2']}'`)
    }
  })
  client.publish(topic.top2, 'This is to all My love ', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message from topic:', topic, payload.toString())
})

