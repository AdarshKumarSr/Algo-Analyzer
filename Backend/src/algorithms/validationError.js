const throwValidation = (msg) => {
  const err = new Error(msg);
  err.isValidationError = true;
  throw err;
}

export default throwValidation;
