const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

const protectRoute = async (req,res,next)=>{
    try {
        const {token} = req.body

        if(!token){
            return res.status(400).json({error:"unauthorised "})
        }

            const decoded = jwt.verify(token,process.env.JWTSECRET)
            
            
            if(!decoded){
                return res.status(401).json({error:"Unauthorised invalid token"})
            }

            const user = await User.findById(decoded.userId).select('-password')
            req.user = user
            next()
    } catch (error) {
        return res.status(500).json({message:"Internal ProtectRoute Error"})
    }
}

module.exports = protectRoute