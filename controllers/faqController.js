const FAQ = require("../models/FAQ.js");
const asyncHandler = require("express-async-handler");

const getFaqs = asyncHandler(async (req, res, next)=>{


    let faqs;
    const {subj} = req.query;

    if(subj){
        faqs = await FAQ.find({subject : subj});

    }else{
        faqs = await FAQ.find();
    }


    return res
        .status(200)
        .json({
            success : true,
            data : faqs
        });
});

module.exports = {
    getFaqs
};