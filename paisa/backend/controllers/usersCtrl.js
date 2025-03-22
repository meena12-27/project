       const bcrypt=require('bcryptjs')
       const User=require('../model/User')
       const jwt=require('jsonwebtoken')
       const asyncHandler=require("express-async-handler");
       //!User Registration
       const usersController={
              //!Register
              register:asyncHandler(async(req,res)=>{
                     const{username,email,password}=req.body;
                     console.log(req.body);
                     //!  Validation
                     if(!username||!email||!password)
                            throw new Error("Invalid")

                     //!chek is user already exists
                     const userExists=await User.findOne({email})
                     if(userExists)
                            throw new Error("User exists")
                     
                     //!HAsh the user pw
                     const salt=await bcrypt.genSalt(10);
                     const hashedPassword=await bcrypt.hash(password,salt)

                     //!create the user and save into db
                     const userCreated=await User.create({
                            email,
                            username,
                            password:hashedPassword
                     });
                     
                     res.json({
                            username:userCreated.username,
                            email:userCreated.email,
                            id:userCreated._id
                     });
              }),
              //!Login
              login: asyncHandler(             async(req,res)=>{
                     //!get the user data 
                     const{email,password}=req.body;
                     //!check if email is valid
                     const user=await User.findOne({email});
                     if(!user)
                            throw new Error("User doesnt exists")
                     //!compare the user pw wih the hashed pw stored in the server
                     const ismatch=await bcrypt.compare(password,user.password)
                     if(!ismatch){
                            throw new Error("Invalid login credentials")
                     }
                     //!generate a token 
                     const token=jwt.sign({id:user._id},"keykey",{ expiresIn: 30 * 24 * 60 * 60})
                     
                     //!print the response 
                     res.json({
                            messgae:'Login success',
                            token,
                            id:user._id,
                            email:user.email,
                            username:user.username
                     })
              }),
              //!profile
              profile:asyncHandler(async(req,res)=>{
                     

                     //!fine the user
                     console.log(req.user);
                     const user=await User.findById(req.user)
                     if(!user){
                            throw new Error("User not found");
                     }
                     //!send response
                     res.json({username:user.username,email:user.email});
              }),
              //!change user password
              changeUserPassword:asyncHandler(async(req,res)=>{
                     const {newPassword}=req.body

                     //!fine the user
                     const user=await User.findById(req.user)
                     if(!user){
                            throw new Error("User not found");
                     }
                     //!hash the new password before saving
                     const salt=await bcrypt.genSalt(10);
                     const hashedPassword=await bcrypt.hash(newPassword,salt);
                     user.password=hashedPassword;
                     //!resave
                     await user.save();
                     
                     //!send response
                     res.json({message:"Passowrd changed succefully"});
              }),
              


              //!update user profile
              updateUserProfile:asyncHandler(async(req,res)=>{
                     const {email,username}=req.body
                     const updatedUser = await User.findByIdAndUpdate(req.user, { username, email }, { new: true });

                     //!fine the user
                     const user=await User.findById(req.user)
                     if(!user){
                            throw new Error("User not found");
                     }
                     //!send response
                     res.json({message:"user profile updated  succefully",updatedUser});
              })
       
              };
       module.exports=usersController;
       