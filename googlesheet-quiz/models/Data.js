const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    values: { type: Array }
});

const Data = mongoose.model('data', dataSchema);
module.exports = Data;