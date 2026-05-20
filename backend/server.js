import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import sparepartsrouter from './routes/sparepartsroutes.js';
import stockoutrouter from './routes/stockoutroutes.js';
import stockinrouter from './routes/stockinroutes.js';
import userrouter from './routes/Userroutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use('/api/spareparts',sparepartsrouter);
app.use('/api/stockout',stockoutrouter);
app.use('/api/stockin',stockinrouter);
app.use('/api/users',userrouter);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB✅');
  })
    .catch((error) => {
        console.log('Failed to connect❌',error)

    })

    app.listen(port,() =>{
        console.log(`Server is running on port ${port}`);
    })


 