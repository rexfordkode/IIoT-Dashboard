const mqtt = require("mqtt")


let prtcl = 'mqtt://localhost:1883';
let client = mqtt.connect(`${prtcl}`)

client.on("connect", () =>{
    setInterval( () =>{
        let random = Math.rand
    })
})