import express from 'express';
import {createComment,getAllComment,showComment,deleteComment} from '../Controller/comentController.js';

const route = express.Router();
  
route.route('/').get(getAllComment);
route.route('/').post(createComment);
  
// route.route('/:id').put(CommentUpdate);
route.route('/:id').get(showComment);
route.route('/:id').delete(deleteComment);


export default route;