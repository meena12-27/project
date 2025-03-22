const express=require("express")
const isAuthenticated=require('../middlewares/isAuth.js');
const categoryController = require("../controllers/categoryCtrl.js");
const categoryRouter=express.Router();
categoryRouter.post('/api/v1/categories/create',isAuthenticated,categoryController.create)
categoryRouter.get('/api/v1/categories/lists',isAuthenticated,categoryController.lists)
// categoryRouter.get('/api/v1/users/profile',isAuthenticated,usersController.profile)
categoryRouter.delete('/api/v1/categories/delete/:id',isAuthenticated,categoryController.delete)
categoryRouter.put('/api/v1/categories/update/:id',isAuthenticated,categoryController.update)
module.exports=categoryRouter;



