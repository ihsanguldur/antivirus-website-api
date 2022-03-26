class CustomError extends Error{
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "customError";
    }
}

module.exports = CustomError;