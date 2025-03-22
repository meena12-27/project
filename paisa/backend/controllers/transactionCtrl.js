       const bcrypt=require('bcryptjs')
       const Transaction=require('../model/Transaction')
       const jwt=require('jsonwebtoken')
       const asyncHandler=require("express-async-handler");
       //!User Registration
       const transactionController={
              //!add
              create:asyncHandler(async(req,res)=>{
                     const {type,category,amount,date,description}=req.body;
                     if(!type||!amount||!date){
                            throw new Error("Amount,date and type required")
                     }
                     //!create
                     const transaction=await Transaction.create({
                            user:req.user,
                            type,
                            category,
                            amount,
                            description
                     });
                     res.status(200).json(transaction)
                     
              }),

              
              //!lsits
              lists: asyncHandler(async(req,res)=>{
                     const transactions=await Transaction.find({
                            user:req.user
                     })
                     res.status(200).json(transactions)
                     
              }),
              //!lists

              getFilteredTransactions : asyncHandler (async(req,res) => {
                     const {startDate,endDate,type,category} = req.query
                     //!queries are the additional payloads that are provided at the end of the router path after ?
                     //! whatever is typed after ? is isplayed in params
                     let filters={user : req.user}
                     // const transactions = await Transaction.find(filters)
                     if(startDate){
                            //!strtdate must be greaterr than or equal to the value on this particular transaction
                            filters.date={...filters.date, $gte:new Date(startDate)}
                     }
                     if(endDate){
                            //!enddate must be greaterr than or equal to the value on this particular transaction
                            filters.date={...filters.date, $gte:new Date(endDate)}
                     }
                     if(type){
                            filters.type=type
                     }
                     if(category){
                            if(category==="All"){
                                   //!no filters needed
                            }
                            else if(category=="Uncategorized"){
                                   //!filter for all the transactions tht are specifically categorized as uncategorized
                                   filters.category="Uncategorized"
                            }
                            else{
                                   filters.category=category
                            }
                     }
                     const transactions=await Transaction.find(filters).sort({date:-1})
                     res.json(transactions);
              }),
             
              //!update
              update:asyncHandler(async(req,res)=>{
                     const transaction=await Transaction.findById(req.params.id)
                     if(transaction && transaction.user.toString()===req.user.toString()){
                            transaction.type=req.body.type || transaction.type;
                            transaction.category=req.body.category || transaction.category;
                            transaction.amount=req.body.amount || transaction.amount;
                            transaction.date=req.body.date || transaction.date;
                            transaction.description=req.body.description || transaction.description;
                            //!updates
                            const updatedTransaction=await transaction.save()
                            res.json(updatedTransaction)
                     }

                     
              }),
              //!delete
              delete:asyncHandler(async(req,res)=>{
                     const transaction=await Transaction.findById(req.params.id)
                     if(transaction && transaction.user.toString()===req.user.toString()){
                            await Transaction.findByIdAndDelete(req.params.id)
                            res.json({message:"Transaction deleted"})
                     }
                     
              })
       
              };
       module.exports=transactionController;
       