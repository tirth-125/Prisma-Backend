import express from 'express';
// import UserController from "../Controller/userController.js";
import {createUserHandler,userUpdate ,getOneUser,getAllUser,deleteUser} from '../Controller/userController.js';

const route = express.Router();
  
route.route('/').post(createUserHandler);
route.route('/').get(getAllUser);

route.route('/:id').put(userUpdate);
route.route('/:id').get(getOneUser);
route.route('/:id').delete(deleteUser);


export default route;