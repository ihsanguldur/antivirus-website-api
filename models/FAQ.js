const mongoose = require("mongoose");

const {Schema} = mongoose;

const FAQSchema = new Schema({

    question : {
        type : String,
        required : "Name is required."
    },
    answer : {
        type : String,
        required : "Content is required."
    },
    subject : {
        type : String,
        required : "Subject is required."
    }

});

module.exports = mongoose.model("FAQ", FAQSchema);