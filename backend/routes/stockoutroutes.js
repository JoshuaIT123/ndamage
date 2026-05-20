import express from 'express'
import {addStockOut,getStockOuts,updateStockOuts,deleteStockOuts} from '../controllers/stockout.controller.js';

const stockoutrouter = express.Router();

stockoutrouter.post('/',addStockOut)
stockoutrouter.get('/',getStockOuts)
stockoutrouter.put('/',updateStockOuts)
stockoutrouter.delete('/',deleteStockOuts)

export default stockoutrouter;