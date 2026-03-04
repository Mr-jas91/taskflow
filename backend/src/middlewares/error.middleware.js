const globalErrorHandler = (err, _, res, _) => {
  console.log("🔥 ERROR:", err);

  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  res.status(statusCode).json({
    status: err.status || "error",
    message,
  });
};

export default globalErrorHandler;