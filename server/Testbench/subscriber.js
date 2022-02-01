
let mqtt = require('mqtt')
let clients=[];

//Configurations
let host = 'mqtt://localhost1:1883';
let numOfClients=1;
let connectionIntervals=10 //in milliseconds
let numbConn=0;

//Subscribe Counter
let counter = 0
let Totalcnt = 0
let interval = 1000
function count() {
    Totalcnt+=counter;
    console.log('Receive Total='+Totalcnt+', rate='+ counter / interval * 1000,'msg/sec')
    counter = 0
}
setInterval(count,interval);


let createConnections= setInterval(() =>{
    numbConn++;
    if(numbConn > numOfClients)
    {
        clearInterval(createConnections)
    }
    else{
        let options = {
            clientId: "SubUser_" + numbConn+"_"+UniqueId(10),
        };
        clients[numbConn] = mqtt.connect(host, options);
        clients[numbConn].on('connect',function(){
            console.log(new Date(),'connected',options.clientId);
            //this.subscribe('channel_'+options.clientId.split('_')[1])
            this.subscribe('channel1')
            this.on('message', function () {
                counter++
            })
        })

        clients[numbConn].on('close', function () {
            console.log(new Date(),"disconnected:" + options.clientId);
            clearInterval(createConnections)
        });
    }
},connectionIntervals)

function UniqueId(Size) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let j = 0; j < Size; j++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
