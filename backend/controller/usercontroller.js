const User = require('../models/usermodel') 

const userForSideBar = async(req,res)=>{
    try {
        const loggedUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedUserId}}).select("-password")  

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        return res.status(500).json({message:"Internal userForSideBar error"})
    }
}
 
module.exports = userForSideBar