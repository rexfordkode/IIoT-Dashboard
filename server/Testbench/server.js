let aedes = require('aedes')({
    mq: require('mqemitter-redis')()
})


let server = require('aedes-server-factory').createServer(aedes.handle,{
    ws: true,
})
let port = 1884
server.listen(port,   ()=> {
    console.log(process.pid, 'server listening on port', process.env.port)
})

aedes.on('clientError',   (client, err) => {
    console.log(process.pid,' client error ', client.id, err.message)
})

aedes.on('publish',   (packet, client) =>{
    //console.log(packet, ' message from client ', client)
})
aedes.on('client',  (client) =>{
    console.log(process.pid, ' new client ', client.id)
})
aedes.on('clientDisconnect',   (client) =>{
    console.log(process.pid, ' Disconnect client ', client.id)
})
