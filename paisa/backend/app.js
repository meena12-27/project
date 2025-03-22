const express=require('express')
const mongoose=require('mongoose')
const app=express();
const userRouter=require("./routes/userRouter.js");
const categoryRouter=require("./routes/categoryRouter.js")
const transactionRouter=require("./routes/transactionRouter.js")
const errorHandler = require('./middlewares/errorHandleMiddleware.js');
const cors=require('cors');
//!connect to mongodb
mongoose
.connect('mongodb://localhost:27017/mern-expenses')
.then(()=>console.log('DB connected'))
.catch((e)=>console.log((e)))

//!cors config
const corsOptions={
  origin:['http://localhost:5173']
}
app.use(cors(corsOptions))
//!middlewares
app.use(express.json())

//!routes
app.use('/',userRouter)
app.use('/',categoryRouter)
app.use('/',transactionRouter)


//!error middleware
app.use(errorHandler)

//!start the server
const PORT=process.env.PORT || 9000;
app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`))