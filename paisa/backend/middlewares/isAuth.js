// const jwt=require('jsonwebtoken')
// const isAuthenticated=async(req,res,next)=>{
//   const headerObj=req.headers
//   //!get the token
//   const token=headerObj?.authorization?.split(' ')[1]
//   console.log(token)
// //   //!verifying the token
//   const verifyToken=jwt.verify(token,"keyKey",(err,decoded)=>{
//     // console.log(decoded)
//     if(err){
//       return false
//     }
//     else{
//       return decoded
//     }
//   })
//   if(verifyToken){
//     //!save the request bodu
//     req.user=verifyToken.id
//     next()
//   }else{
//     const err=new Error("Token expired, login again")
//       next(err)
    
//   }
//   console.log(verifyToken)
  
// }
// module.exports=isAuthenticated; 



// const jwt = require("jsonwebtoken");

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers?.authorization?.split(" ")[1]; // Extract token
//     if (!token) {
//       return res.status(401).json({ message: "No token provided, login again" });
//     }

//     // Verify token
//     jwt.verify(token, "keyKey", (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "Token expired, login again" });
//       }

//       // Attach user info to the request
//       req.user = decoded.id;
//       next(); // Proceed to the next middleware
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error, try again" });
//   }
// };

// module.exports = isAuthenticated;


const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, "keykey");
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};

module.exports = isAuthenticated;
