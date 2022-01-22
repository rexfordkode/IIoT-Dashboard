const mqtt = require('mqtt');
// const mqtt = require('mqtt-packet');

const host = 'localhost';
const port = '1883';

let count = 0;
// Variables 
//Start ========================================

let options = {
  clientId :`mqtt_${Math.random().toString(16).slice(3)}`,
  clean: true,
  connectTimeout: 4000,
  username: 'mqtt1',
  password: 'password',
  reconnectPeriod: 1000,
}
// let topic = 'This is the new Topic'
let topic_level = {
  'topic1':0,
  'topic2':1,
  'topic3':1  
}

let topics = {
  top1: 'example/school/shs/bschool',
  top2: 'example/school/shs/gschool',
  top3: 'example/school',
}
let message = 'Test message' //Payload messages

// End===============================

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, options)


//Incoming messages
//Start===========================================
client.on('message', (topics,message,packet) =>{
  console.log('message is', message);
  console.log('topic is ', topics.top1)
  console.log(client.packet)
})

let pub_options = {
  'qos1':0,
    'qos1': 1,
      'qos2':2
}

// End of Variables ==========================================

// const topic = '/nodejs/mqtt'


client.on('connect', () => {
  console.log('Connected successfully '+client.connected)

})
  //Subscription
  client.subscribe([topics.top1], () => {
    console.log(`Subscribe to topic '${[topics.top1]}'`)
  })

  client.subscribe(topics_list,{qos:1}); //single topic
  // Error Handling
// =======================

  client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)});

  //Publishing
  // ===========================
  const publish = (topics,msg, options) =>{
    console.log('Publishing',msg);

    if(client.connected == true){
      client.publish(topics[top1],msg,options);
    } 
    count +=1 //Publish count
    if(count == 2) //ens scription{
      clearTimeout(timer_id); //Stop timer
      client.end();
    }

  let options_pub = {
    retain: true,
    qos : 1
  }

    //Calling the publishing function in a setInternal variable function with a callback
    let timer_id = setInterval( () =>{
      publish(topic,message,options) },5000);
  

  //This is the publish function 
  // End====================================================================

  

  client.publish(topic.test3, 'TTU Newsite', options_pub, (error) => {
    if (error) {
      console.error(error)1500
    }
  })


// client.on('message', (topic, payload) => {
//   console.log('Received Message:', topic, payload.toString())
// })

//DISCONNECTION 
client.on('disconnect', (packet) =>{ console.log(packet)})