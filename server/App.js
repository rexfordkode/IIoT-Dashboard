const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 5000;


app.use(cors())
const connectionRouter = require('./routes/Connection');


app.use('/connection', connectionRouter);

app.listen(PORT, ()=> console.log('server'))