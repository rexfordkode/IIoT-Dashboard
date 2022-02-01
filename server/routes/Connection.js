// const express = require('express');
import express from "express"
const cors = require('cors');
const app = express ();
const router = express.Router();

import {getConn, createPub} from "../controller/conn"




router.get('/Connection', getConn);
router.post('/Publication', createPub);





module.exports = router;