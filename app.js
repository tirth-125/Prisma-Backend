import express from 'express';
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import comentRouter from './routes/commentRoutes.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', comentRouter);


export default app;