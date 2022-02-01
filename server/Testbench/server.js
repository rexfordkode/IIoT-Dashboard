const express = require("express")
const aedes = require('aedes')();
const server = require('aedes-server-factory').createServer(aedes, {
  ws: true,
});
const brokerPort = 1883;
// const ws = require('websocket-stream')
const port = process.env.PORT || 5000;
const app = express(); 


server.listen(brokerPort, () =>{
    console.log('Broker Server started and connected on port ', brokerPort, 'pid', process.pid);
  }); 

  aedes.authenticate = (client, username, password, callback) => {
      password = Buffer.from(password, 'base64').toString();
      if (username === 'username' && password === 'password') {
          return callback(null, true);
      }
      const error = new Error('Authentication Failed!! Invalid user credentials.');
      console.log('Error ! Authentication failed.')
      return callback(error, false)
  }

//   // create a GET route
app.post('/Testbench/server', (req, res) => { //Line 9
    aedes.on('client',  (client) => {
        res.send({ express: 'Connected' }); 
        // console.log(`Client connected with client  ${(client ? client.id : client)} connected to broker ${aedes.id}`)
    })
    
  }); 
  app.get('/Testbench/testpub',(req, res) =>{
    aedes.publish('publish',(client) =>{
      
    })
  })

  app.listen(port, ()=> console.log(`Listening on port ${port}`));


  
// let server = require('aedes-server-factory').createServer(aedes.handle,{
//     ws: true,
// })
// let port = 1884
// server.listen(port,   ()=> {
//     console.log(process.pid, 'server listening on port', process.env.port)
// })

// aedes.on('clientError',   (client, err) => {
//     console.log(process.pid,' client error ', client.id, err.message)
// })

// aedes.on('publish',   (packet, client) =>{
//     //console.log(packet, ' message from client ', client)
// })
// aedes.on('client',  (client) =>{
//     console.log(process.pid, ' new client ', client.id)
// })
// aedes.on('clientDisconnect',   (client) =>{
//     console.log(process.pid, ' Disconnect client ', client.id)
// })
