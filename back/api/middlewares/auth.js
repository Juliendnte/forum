require("dotenv").config()

const api_key = process.env.API_KEY;

function validateToken(req, res, next) {
   const token = req.get('Authorization');
   if (!token){
       return res.status(401).send("Unauthorized")
   }else if (token !== api_key){
       return res.status(403).send("Forbidden")
   }else{
       return next();
   }
}

module.exports = validateToken;