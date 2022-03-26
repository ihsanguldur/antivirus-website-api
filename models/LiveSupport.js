const mongoose = require("mongoose");

const {Schema} = mongoose;

const liveSupportSchema = new Schema({
    liveSupportType : {
        type : String,
        default : "classic",
        enum : ["classic","Technical"]
    },
    sender : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        }
    ],
    supporter : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        }
    ],
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Message"
        }
    ],
    state : {
        type : String,
        default : "pending",
        enum : ["done","pending","resuming"]
    }
});

module.exports = mongoose.model("LiveSupport", liveSupportSchema);