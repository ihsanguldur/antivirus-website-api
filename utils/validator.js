function isEmailValid(email) {
    const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return regExp.test(email);
}

module.exports = {
    isEmailValid
}