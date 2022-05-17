const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/emailSender");
const CustomError = require("../utils/customError.js");
const {successPresenter} = require("../utils/presenter");
const {isEmailValid} = require("../utils/validator");

const createUser = asyncHandler(async (req, res, next)=>{

    const {name, surname, email, password} = req.body;
        await User.create({
            name,
            surname,
            email,
            password});

        return successPresenter(res, undefined);

        /*return res
            .status(200)
            .json({
                success : true
            });*/
});

const login = asyncHandler( async (req,res,next)=> {

    const {email, password} = req.body;

    if(email === "" || password === ""){
        return next(new CustomError("Check your inputs.",400));
    }

    const user = await User.findOne({email: email});

    if(!user){
        return next(new CustomError("Email is not correct.", 404));
    }

    const compare = await user.comparePassword(password, CustomError, next);

    if(!compare){
        return next(new CustomError("Password is not correct.", 400));
    }

    return successPresenter(res, user);

    /*return res
        .status(200)
        .json({
            success : true,
            data : user
        });*/

});

const sendResetEmail = asyncHandler(async (req, res, next)=>{

    const {email} = req.body;
    const user = await User.findOne({email : email});

    if(!user){
        return next(new CustomError("Email is not found.",404));
    }

    const resetToken = user.getResetPasswordToken();

    const url = "http://localhost:3000/password/reset?token="+resetToken;

    const mailTemplate = `
        <h3> Reset Your Password  </h3>
        <p>this <a href="${url}" target="_blank">Link</a> will expire in 1 hour.</p>
    `;

    await sendEmail({
        from : process.env.SMTP_USER,
        to : email,
        subject : "Reset Your Password",
        html : mailTemplate
    });

    await user.save();

    return successPresenter(res,"Please check your email.");

    /*return res
        .status(200)
        .json({
            success : true,
            message : "Please check your email."
        });*/
});

const resetPassword = asyncHandler(async (req, res, next)=>{

    const {token} = req.query;
    const {password} = req.body;

    const user = await User.findOne({
        resetPasswordToken : token,
        resetPasswordExpire : {$lt : Date.now()}});

    const compare = await user.comparePassword(password, CustomError, next);

    if(compare){
        return next(new CustomError("Password cannot be the same as the old password.",400));
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return successPresenter(res, "Password is changed.");

    /*return res
        .status(200)
        .json({
            success : true,
            message : "Password is changed."
        });*/

});

const updateUser = asyncHandler(async (req, res, next)=>{
    const {name, surname, email} = req.body;
    const {id} = req.params;

    if(name === "" || surname === "" ||email === ""){
        return next(new CustomError("Please check your inputs.",400));
    }

    if(!isEmailValid(email)){
        return next(new CustomError("Email is not valid.",400));
    }

    let updatedUser = await User.findOneAndUpdate({_id : id},{name, surname, email},{
        new : true
    });
    if(!updatedUser){
        return next(new CustomError("User not found.",401));
    }

    await updatedUser.save();

    return successPresenter(res, updatedUser);

});

module.exports = {
    createUser,
    login,
    sendResetEmail,
    resetPassword,
    updateUser
};