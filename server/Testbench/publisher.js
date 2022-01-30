
let mqtt = require('mqtt')
let clients=[];
let publishers=[];
let parallel = require('fastparallel')({
    released: publishCompleted,
    results: true})

//Configurations
let host = 'mqtt://localhost:1883';
let numOfClients=1000; //max count of clients
let connectionIntervals=10 //interval of connecting to the broker in milliseconds 
let numOfConn=0; //start number

//Publish Counter
let counter = 0
let Totalcnt = 0
let interval = 1000
const count =() =>{
    if(counter){
        Totalcnt+=counter;
        console.log('Sent Total='+Totalcnt+', rate='+ counter / interval * 1000 ,'msg/sec')
        counter = 0
    }
}

let createConnections= setInterval(() =>{
    numOfConn++;
    if(numOfConn > numOfClients)
    {
        clearInterval(createConnections)
        startPublish();
    }
    else{
        let options = {
            clientId: "userPub" + numOfConn+"_"+UniqueId(10),
        };
        clients[numOfConn] = mqtt.connect(host, options);
        clients[numOfConn].on('connect',() =>{
            console.log(new Date(),'connected',options.clientId);
        })

        clients[numOfConn].on('close', () =>{
            console.log(new Date(),"disconnected:" + options.clientId);
            clearInterval(createConnections)
        });
    }
},connectionIntervals)

const startPublish =() =>{
    setInterval(()=>{
        if(publishers.length > 0)
        {
            parallel(
              {}, // what will be this in the functions 
              parallelPblish, // functions to call 
              publishers, // the first argument of the functions 
              done // the  const to be called when the parallel ends 
            )
        }
    
    },1000)
    setInterval(count, interval)
}

const done =(err, results) =>{
    console.log('published, results:', results)
}
 const publishCompleted = () => {
    console.log('publish completed!')
}
 const parallelPblish = (clnt, cb) =>{
    clients[clnt].publish('topic', 'payload', ()=>{
        counter++;
        cb();
    })

}

 const UniqueId =(Size)=> {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let j = 0; j < Size; j++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

let subClient = mqtt.connect({ port: 1883, host: '192.168.0.161', clean: true, keepalive: 0, clientId: "subForPub_"+UniqueId(5) })
subClient.on('connect', () =>{
    count()
    this.subscribe('PubControl')
    this.on('message', (topic,msg) => {
        //console.log(JSON.parse(msg.toString()).noOfPub)
        if(JSON.parse(msg.toString()).noOfPub==='stop')
        {
            publishers = new Array();
        }
        else{
            publishers = new Array();
            for(i =1 ; i<=JSON.parse(msg.toString()).noOfPub; i++ )
            {
                publishers.push(i);
            }
        }
    })
})
