const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    contractor: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    price:{
        type:Number
    },
    status:{
        type:String
    },
    number:{
        type:Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);