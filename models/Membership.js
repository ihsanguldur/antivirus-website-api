const mongoose = require("mongoose");

const {Schema} = mongoose;

const membershipSchema = new Schema({
    name : {
        type : String,
        require : "Name is required."
    },
    membershipType : {
        type : String,
        default : "personal",
        enum : ["personal","business"]
    },
    startDate : {
        type : Date,
        default : Date.now
    },
    finishDate : {
        type : Date
    },
    price : {
        type : Number,
        require : "Price is required."
    },
    features : [],
    offerId : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Offer"
        }
    ],
    isActive : {
        type : Boolean,
        default : true,
    }
});

module.exports = mongoose.model("Membership",membershipSchema);