#! /usr/bin/env node

const mqtt = require('mqtt')
// const convertHrtime = require('convert-hrtime');
const mode = require('compute-mode')

//Variables for connecting to a broker url
const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {clean: true}, {keepalive: 0 })
const interval = 5000

let sent = 0
const latencies = []

const  count = ()=> {
  console.log('sent/s', sent / interval * 1000)
  sent = 0
}

setInterval(count, interval)

const  publish =()=> {
  sent++
  client.publish('test', JSON.stringify(process.hrtime()), { qos: 1 })
}

const  subscribe =()=> {
  client.subscribe('test', { qos: 1 }, publish)
}

client.on('connect', subscribe)
client.on('message', publish)
client.on('message', (topic, payload) => {
  const sentAt = JSON.parse(payload)
//   const diff = process.hrtime(sentAt)
//  latencies.push(convertHrtime(diff).ms)
})

client.on('offline', ()=> {
  console.log('offline')
})

client.on('error', ()=> {
  console.log('reconnect!')
  client.stream.end()
})

process.on('SIGINT', () =>{
  const total = latencies.reduce( (acc, num) =>{
    return acc + num
  })
  console.log('total', total)
  console.log('average', total / latencies.length)
  console.log('mode', mode(latencies))
  process.exit(0)
})