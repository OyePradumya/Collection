const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter service name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter service description"]
    },
    requirements:[
        {
            title:String,
            description:String
        }
    ],
    cost:{
        type:Number,
        required:true
    },
    purchasedBy: {
        type: String,
    },
    contactTo:Number,
    Status:{
        required:true,
        default:true,
        type:Boolean,
    }
});

module.exports = mongoose.model('Service', serviceSchema);