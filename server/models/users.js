const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    about: { type: String },
    favColor: { type: String },
    gender: { type: String },
    email: { type: String },
    dob: { type: Date },
    luckyNumber: { Number },
    courseSatisfaction: { type: String },
    phone: { type: String },
    education: { type: String },
    hobbies: { type: Array }
});

module.exports = mongoose.model('User', userSchema);



