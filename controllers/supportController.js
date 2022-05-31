const asyncHandler = require("express-async-handler");
const LiveSupport = require("../models/LiveSupport");
const CustomError = require("../utils/customError.js");
const {successPresenter} = require("../utils/presenter");

const createClassicSupportRequest = asyncHandler(async (req, res, next)=>{

    const {sender,membership , supporter, messages, state} = req.body;

    const supportExists = await LiveSupport.exists({sender, state : "pending"})
    if(supportExists) {
        return next(new CustomError("You have pending support request.",400))
    }
    await LiveSupport.create({sender, membership, supporter, messages, state});

    return successPresenter(res, undefined);

});

const updateClassicSupportRequest = asyncHandler(async (req, res, next)=>{

    const {_id, sender, membership, supporter, messages, state} = req.body;

    const supportRequest = await LiveSupport.findOneAndUpdate({_id}, {sender, membership, supporter, messages, state},{
        new : true
    });

    return successPresenter(res, supportRequest);


});

const getPendingSupportRequests = asyncHandler(async (req,res, next)=>{

    const pendingSupportRequests = await LiveSupport.find().populate("sender").populate("supporter");

    return successPresenter(res, pendingSupportRequests);

});

module.exports = {
    createClassicSupportRequest,
    updateClassicSupportRequest,
    getPendingSupportRequests
}