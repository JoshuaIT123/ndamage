import express from 'express'
import { createStockIn, getStockIns } from "../controllers/stockin.controller.js";

const stockinrouter = express.Router();
stockinrouter.post('/', createStockIn)
stockinrouter.get('/', getStockIns)

export default stockinrouter;