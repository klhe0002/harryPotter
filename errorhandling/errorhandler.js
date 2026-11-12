//global error handling middleware

export default function (err, req, res, next) {
  console.error(err.stack); // Log the error
  console.log(err.statusCode);

  let error = "Internal server error";
  if (err.statusCode == 404) {
    error = "Not found";
  } else if ((err.statusCode = 400)) {
    error = "bad request";
  }

  res.status(err.statusCode).json({
    message: err.message,
    error: "Database error",
    statusCode: err.statusCode,
  });
}
