const express = require('express');
const userRouter = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const {AuthtestConnection, login, register} = require('../controller/userAuthController')
const { testConnection, getUsers, createUser, updateUser, deleteUser, getUserById, getUserCount, deleteUsersBulk } =  require('../controller/userController');

//  ******** USER AUTH ROUTES *********

userRouter.get('/auth/test', AuthtestConnection);
userRouter.post('/login', login);
userRouter.post('/register', register);

userRouter.get('/test', testConnection);
userRouter.get('/get-users', verifyToken, getUsers);
userRouter.get('/get-user-details/:id', getUserById);
userRouter.get('/user-count', getUserCount);
userRouter.post('/create-users', createUser);
userRouter.put('/update-user/:id', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);
userRouter.post('/delete-bulk-user', deleteUsersBulk);

module.exports = userRouter;