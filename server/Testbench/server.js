const express = require("express")
const aedes = require('aedes')();
const server = require('aedes-server-factory').createServer(aedes, {
  ws: true,
});
const port = 1883;
const app = express(); 


server.listen(port, () =>{
    console.log('Server started and listening on port ', port);
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

  // create a GET route
app.get('/Testbench/server', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  }); 

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
