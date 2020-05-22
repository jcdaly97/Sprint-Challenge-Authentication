/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  
  if(token){
    const secret = 'shhhhhhhhhh'

    jwt.verify(token, secret, (error, decodedToken)=>{
      if(error){
        res.status(401).json({ message: "you shall not pass!" })
      }else{
        req.jwt = decodedToken
        next()
      }
    })
  }else{
    res.status(401).json({ message: 'please provide authentication info' });
  }
  
};
