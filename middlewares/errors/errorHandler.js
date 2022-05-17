const {errorPresenter} = require("../../utils/presenter.js");

let message = "something went wrong";
let status = 500;

const errorHandler = (err, req, res, next) =>{
    console.log(err)
    if (err.name === "ValidationError") { // for email and password.
        //let errors = {};
        message = "check this inputs : ";
        status = 400;
        Object.keys(err.errors).forEach((key) => { // Object.keys return given object's keys (array)
            message += key + ", ";
        });

    }else if(err.name === "MongoServerError"){
        if(err.code === 11000){ // duplicate error
            status = 400;
            message = "this email is already in use.";
        }
    }else if(err.name === "customError"){
        status = err.status;
        message = err.message;
    }
    return errorPresenter(res, status, message);
    /*return res
        .status(status)
        .json({
            success : false,
            message : message
        });*/

}

module.exports = errorHandler;