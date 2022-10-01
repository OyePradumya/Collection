const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const connectDatabase = () => {
    mongoose.connect('mongodb+srv://dev_jb_007:12345678devpatel@cluster0.ibx33.mongodb.net/YouthConclave?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;