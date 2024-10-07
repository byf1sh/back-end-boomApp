// utils/errorHandler.js
exports.handleError = (error, res, statusCode = 500) => {
    console.error('Error details:', error); // Log detail error untuk debugging
    res.status(statusCode).json({
      message: 'Something went wrong: ' + (error.message || 'Unknown error'),
    });
  };
  