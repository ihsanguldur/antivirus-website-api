const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {hash} = require("bcrypt");

const {Schema} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        required : "Name is required."
    },
    surname : {
        type : String,
        required : "Surname is required."
    },
    email : {
        type : String,
        required : "Email is required.",
        unique : true,
        match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address."]
    },
    password : {
        type : String,
        required : "Password is required",
        minlength : [6,"Password must contain 6 or more characters "]
    },
    role : {
        type : String,
        default : "user",
        enum : ["user", "supporter", "admin"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    totalDate : {
        type : Number
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpire : {
        type : Date
    }
});

userSchema.methods.getResetPasswordToken = function (){
    const randomHex = crypto.randomBytes(10).toString("hex");

    const token = crypto
        .createHash("SHA512")
        .update(randomHex)
        .digest("hex");
    this.resetPasswordToken = token;
    this.resetPasswordExpire = Date.now() + 3600;

    return token;
}

userSchema.pre("save", function (next){

    if(!this.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next();
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) return next();
            this.password = hash;
            return next();

        });
    });

});

userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User",userSchema);
