const errorMiddleware = (err, req, res, next) => {
    // Log the error
    console.error(err);
  
    // Default status code for unhandled errors
    let statusCode = 500;
  
    // Determine the appropriate status code for certain error types
    if (err.name === 'SequelizeValidationError') {
      statusCode = 400; // Bad Request for validation errors
    }
  
    // Send the error response to the client
    res.status(statusCode).json({ error: err.message });
  };
  
  module.exports = errorMiddleware;