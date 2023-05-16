const mongoose = require('mongoose')



const notifSchema = new mongoose.Schema({

    codeOracle: {
        type: String,
        
        default: false
    },
    quantity: {
        type: Number,
        default: false
    }, 
    department:{
        
        type: String,
        required: true

    },
    Date: { type: Date, default: Date.now }
});
    
    




module.exports = mongoose.model('notification',notifSchema)