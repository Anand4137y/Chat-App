const mongoose = require('mongoose')

const MongooseConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOBD)
        console.log("database connected");
        
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = MongooseConnect