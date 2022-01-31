
import express from "express";
import {v4 as uuid} from "uuid";
const app = express ();
const router = express.Router();


let connect = []
let pub = []

export const getConn = (req, res) =>{
    res.send(Connection)
}

export const createPub = (req, res) =>{
    const pub = req.body;
     pub.push({...pub, topic: data })        

}