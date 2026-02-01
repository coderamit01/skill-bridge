import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
import { tutorRouter } from './modules/tutor/tutor.router';
import { currentUser } from './modules/user/currentUser';
import { categoryRouter } from './modules/category/category.router';
import { userRouter } from './modules/user/user.router';
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

// category route
app.use('/api/v1/categories', categoryRouter)

app.use('/api/v1', userRouter)


app.use('/',(req,res) => {
  res.send("Hello World!")
})

export default app;