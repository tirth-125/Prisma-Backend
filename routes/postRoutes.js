import express from 'express';
import {createPost,getAllPost,showPost,postUpdate,deletePost,searchPost} from '../Controller/postController.js';

const route = express.Router();
   
route.route('/').get(getAllPost);
route.route('/search').get(searchPost);
route.route('/').post(createPost);

  
route.route('/:id').put(postUpdate);
route.route('/:id').get(showPost);
route.route('/:id').delete(deletePost);


export default route;