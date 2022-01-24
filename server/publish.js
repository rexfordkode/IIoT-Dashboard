
const { request } = require('express')
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/newEnd', (req, res) => res.send('Hello This my new endpoint!'))

app.get('/getWeathertoro nto',(res, req) =>{
    request(
        "http://api.apixu.com/v1/current.json?key=36272f88f5b49d9b0d0452191905&q=Toronto",
        (error, response, body) =>{
            if(!error && response.statusCode == 200){
                let parsedBody = JSON.parse(body)
                let temp_c = parsedBody['current']["temp_c"]
                res.send(body)
            }
        }
    )
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
