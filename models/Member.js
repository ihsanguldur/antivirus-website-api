const mongoose = require("mongoose");

const {Schema} = mongoose;

const memberSchema = new Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    membership : {
        type : mongoose.Schema.ObjectId,
        ref : "Membership"
    },
    startDate : {
        type : Date,
        default : Date.now
    },
    finishDate : {
        type : Date
    }
});

module.exports = mongoose.model("Member", memberSchema);