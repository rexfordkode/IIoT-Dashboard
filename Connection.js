const express = require('express');
const cors = require('cors');
const app = express ();


// Parse JSON
app.use(express.json());

// Use CORS
app.use(cors());

// Testing response
app.get('/', (req,res) => {
    res.send('Hello, server is up.');
})

app.post('/',upload, (req, res)=>{
    let url = req.body.url;
    let port = req.body.port;
    let cientId = req.body.clientId;
})



const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log('Server is running at Port: ' + port);
    }
})