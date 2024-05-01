const bodyParser = require('body-parser');

module.exports = (err, req, res, next) => {

  // Erro de análise JSON
  console.log("Starting validatePayload middleware")
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // Erro de análise JSON
    return res.status(400).json({
      message: "Invalid JSON format",
      statusCode: 400
    });
  }

  console.log("finishing validatePayload middleware and calling next")
  next(err);
};