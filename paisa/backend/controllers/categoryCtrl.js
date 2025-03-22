       const bcrypt=require('bcryptjs')
       const Category=require('../model/Category')
       const jwt=require('jsonwebtoken')
       const Transaction=require('../model/Transaction.js')
       const asyncHandler=require("express-async-handler");
       //!User Registration
       const categoryController={
              //!add
              create:asyncHandler(async(req,res)=>{
                     const {name,type}=req.body;
                     if(!name||!type){
                            throw new Error("Name and type required")
                     }
                     //!convert to lower case
                     const normalizedName=name.toLowerCase();
                     //!check if type is valid
                     const validTypes=['income','expense'];
                     if(!validTypes.includes(type.toLowerCase())){
                            throw new Error("Invalid category type:"+type);
                     }
                     //!check if category already exists
                     const categoryExists=await Category.findOne({
                            name:normalizedName,
                            user:req.user,
                     })
                     if(categoryExists){
                            throw new Error(`${categoryExists.name}Category exists`)
                     }
                     const category=await Category.create({
                            name:normalizedName,
                            user:req.user,
                            type,
                     })
                     res.status(200).json(category);
                     
              }),

              
              //!lists
              lists: asyncHandler(async(req,res)=>{
                     const categories=await Category.find({
                            user:req.user})

                     res.status(200).json(categories)
              }),
              //!update
                 
              update: asyncHandler(async (req, res) => {
                     const { id } = req.params; // ✅ Use 'id' instead of 'categoryId'
                     const { type, name } = req.body;
                 
                     if (!name && !type) {
                         return res.status(400).json({ message: "Nothing to update" });
                     }
                 
                     // ✅ Convert name to lowercase safely
                     const normalizedName = name ? name.toLowerCase() : undefined;
                 
                     // ✅ Find the category
                     const category = await Category.findById(id);
                 
                     // ✅ First, check if category exists
                     if (!category) {
                         return res.status(404).json({ message: "Category not found" });
                     }
                 
                     // ✅ Then, check if the logged-in user is authorized
                     if (category.user.toString() !== req.user) {
                         return res.status(403).json({ message: "User not authorized" });
                     }
                 
                     const oldName = category.name;
                 
                     // ✅ Update category properties only if new values exist
                     if (normalizedName) category.name = normalizedName;
                     if (type) category.type = type;
                 
                     const updatedCategory = await category.save();
                 
                     // ✅ Update transactions only if the name changed
                     if (oldName !== updatedCategory.name) {
                         await Transaction.updateMany(
                             { user: req.user, category: oldName },
                             { $set: { category: updatedCategory.name } }
                         );
                     }
                 
                     res.status(200).json(updatedCategory);
                 }),
                 
              //!delete
              delete:asyncHandler(async(req,res)=>{
                     const category=await Category.findById(req.params.id)
                     if(category && category.user.toString()===req.user.toString()){
                            const defaultCategory="Uncategorized"
                            await Transaction.updateMany(
                                   {user:req.user,category:category.name},
                                   {$set:{category:defaultCategory}}
                            );
                            //!remove cetagory
                            await Category.findByIdAndDelete(req.params.id);
                            res.json({message:"Category removed and transactions updated"})
                     }  
                     else{
                            res.json({message:"Cetagory not found or user not authorixed"})
                     }
              })
       
              };
       module.exports=categoryController;
       