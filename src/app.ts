import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
import { tutorRouter } from './modules/tutor/tutor.router';
import { currentUser } from './modules/currentUser/currentUser';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
   methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json())

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/v1', tutorRouter);
app.use('/api', currentUser);



app.use('/',(req,res) => {
  res.send("Hello World!")
})

export default app;