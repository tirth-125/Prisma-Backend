import express from 'express';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

export default app;