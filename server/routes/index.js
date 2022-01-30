
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const  bodyParser = require('body-parser');
const cors = require("cors");
const app = express ();

const Connection = require("./Connection");
const Publisher = require("./Publisher");
const Subscriber = require("./Subscriber");



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Testing response
app.get('/', (req,res) => {
    res.send({message: "Am really having fun the to the React"})
})




const port = process.env.PORT || 5000;


app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log('Server is running at Port: ' + port);
    }
})