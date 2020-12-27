import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';  
import reservationRoutes from './routes/reservation.js';

const app = express();
dotenv.config();

//https://github.com/expressjs/body-parser
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/reservations', reservationRoutes);

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);