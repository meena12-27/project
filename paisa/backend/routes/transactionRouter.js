const express=require("express")
const isAuthenticated=require('../middlewares/isAuth.js');
const transactionController = require("../controllers/transactionCtrl.js");
const transactionRouter=express.Router();
transactionRouter.post('/api/v1/transactions/create',isAuthenticated,transactionController.create)
transactionRouter.get('/api/v1/transactions/lists',isAuthenticated,transactionController.lists)
transactionRouter.get('/api/v1/transactions/getFilteredTransactions',isAuthenticated,transactionController.getFilteredTransactions)
transactionRouter.put('/api/v1/transactions/update/:id',isAuthenticated,transactionController.update)
transactionRouter.delete('/api/v1/transactions/delete/:id',isAuthenticated,transactionController.delete)
module.exports=transactionRouter;



