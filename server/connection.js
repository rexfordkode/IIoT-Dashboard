const mqtt = require('mqtt')

const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'mqtt1',
  password: 'password',
  reconnectPeriod: 1000,
})

// const topic = '/nodejs/mqtt'
const topic = {
  test1: 'example/school/shs/bschool',
  test2: 'example/school/shs/gschool',
  test3: 'example/school',
}

client.on('connect', () => {
  console.log('Connected successfully')
  //Subscription
  client.subscribe([topic.test3], () => {
    console.log(`Subscribe to topic '${[topic.test3]}'`)
  })

  //Publishing
  client.publish(topic.test3, 'TTU Newsite', { qos: 0, retain: true }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

//DISCONNECTION 
client.on('disconnect', (packet) =>{ console.log(packet)})