import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json())











app.use('/',(req,res) => {
  res.send("Hello World!")
})

export default app;