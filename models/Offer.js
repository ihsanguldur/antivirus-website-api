const mongoose = require("mongoose");

const {Schema} = mongoose;

const offerSchema = new Schema({
    name : {
        type : String,
        require : "Name is required."
    },
    value : {
        type : Number
    },
    startDate : {
        type : Date,
        default : Date.now
    },
    finisDate : {
        type : Date
    }
});

module.exports = mongoose.model("Offer", offerSchema);