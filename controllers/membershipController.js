const Membership = require("../models/Membership.js");
const asyncHandler = require("express-async-handler");
const {successPresenter} = require("../utils/presenter");

const createMembership = asyncHandler(async (req, res, next)=>{

    const {name, price, features} = req.body;

    const newMembership = await Membership.create({name, price, features});

    return res
        .status(200)
        .json({
           success : true,
           data : newMembership
        });

});

const getAllMembership = asyncHandler(async (req, res, next)=>{

    const memberships = await Membership.find();

    return successPresenter(res, memberships);

    /*return res
        .status(200)
        .json({
           success : true,
           data : memberships
        });*/

});

module.exports = {
    createMembership,
    getAllMembership
};