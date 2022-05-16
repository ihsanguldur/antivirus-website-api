
function successPresenter(res, data){
    return res
        .status(200)
        .json({
            success : true,
            data
        });

}

function errorPresenter(res,status, message){
    return res
        .status(status)
        .json({
           success : false,
           message
        });
}


module.exports ={
    successPresenter,
    errorPresenter
}