export default function (err, req, res, next) {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let error = err.error || "Internal server error";

  if (statusCode === 404) {
    error = "Not found";
  } else if (err.statusCode === 400) {
    error = "Bad request";
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    error: error,
    message: message,
  });
}
