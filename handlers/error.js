// if there is other parameters than req, res, next, put it in the front
function errorHandler(error, req, res, next) {
    res.status(error.status || 500).json({
        error : {
            message: error.message || "Oops! Something went wrong!"
        }
    });
    return next();
}

module.exports = errorHandler;