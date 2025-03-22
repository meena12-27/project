const express=require("express")
const usersController=require('../controllers/usersCtrl.js')
const isAuthenticated=require('../middlewares/isAuth.js')
const userRouter=express.Router();
userRouter.post('/api/v1/users/register',usersController.register)
userRouter.post('/api/v1/users/login',usersController.login)
userRouter.get('/api/v1/users/profile',isAuthenticated,usersController.profile)
userRouter.put('/api/v1/users/changeUserPassword',isAuthenticated,usersController.changeUserPassword)
userRouter.put('/api/v1/users/updateUserProfile',isAuthenticated,usersController.updateUserProfile)
module.exports=userRouter;



