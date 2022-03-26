const mongoose = require("mongoose");

const {Schema} = mongoose;

const messageSchema = new Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    content : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Message", messageSchema);