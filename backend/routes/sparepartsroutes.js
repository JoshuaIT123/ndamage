import express from 'express'
import { createSparepart, getSpareparts, deleteSparepart } from '../controllers/spareparts.controller.js';

const sparepartsrouter = express.Router();
sparepartsrouter.post('/', createSparepart)
sparepartsrouter.get('/', getSpareparts)
sparepartsrouter.delete('/:id', deleteSparepart)

export default sparepartsrouter;