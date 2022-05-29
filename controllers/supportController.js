const asyncHandler = require("express-async-handler");
const LiveSupport = require("../models/LiveSupport");
const {successPresenter} = require("../utils/presenter");

const createClassicSupportRequest = asyncHandler(async (req, res, next)=>{

    const {sender, supporter, messages, state} = req.body;

    await LiveSupport.create({sender, supporter, messages, state});

    return successPresenter(res, undefined);

});

const updateClassicSupportRequest = asyncHandler(async (req, res, next)=>{

    const {_id, sender, supporter, messages, state} = req.body;

    const supportRequest = await LiveSupport.findOneAndUpdate({_id}, {sender, supporter, messages, state},{
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