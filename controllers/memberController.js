const Member = require("../models/Member.js");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError.js");


const createMember = asyncHandler(async (req, res, next) => {

    const {user, membership} = req.body;

    const exists = await Member.exists({user : user});

    if(exists){
        await Member.deleteOne({user : user});
    }

    await Member.create({user : user, membership : membership});

    return res
        .status(200)
        .json({
           success : true
        });


});

const getMember = asyncHandler(async (req, res, next)=>{

    const {user} = req.params;

    const member = await Member.findOne({user : user }).populate("user").populate("membership");

    if(!member){
        return next(new CustomError("User does not have any membership.", 400));
    }
    return res
        .status(200)
        .json({
           success : true,
           data : member
        });

});

module.exports = {
    getMember,
    createMember
}
