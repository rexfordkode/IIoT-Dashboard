// const express = require('express');
// import express from "express"
// const cors = require('cors');
// const app = express ();
// const router = express.Router();

const  loansController = require("../controller/conn")




router.get('/connection', Controller.getConn);
router.post('/publication', Controller.createPub);





module.exports = router;