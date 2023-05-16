const mongoose = require('mongoose')



const productSchema = new mongoose.Schema({

    ART: {
        type: String,
        required: true
    },
    
    codeOracle: {
        type: String,
        required: true,
        default: false
    },
    Description: {
        type: String,
        required: true,
        default:false
    },
    quantity: {
        type: Number,
        required: true,
        default: false
    },
    alert_quantity: {
        type: Number,
        required: true,
        default: false
    },
    department: {type: String,
        required: false,
        default: false }
});
    
    




module.exports = mongoose.model('product',productSchema)