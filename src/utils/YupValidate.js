export default (validationSchema, currentValues, setErrors) => {
    validationSchema
    .validate(currentValues, { abortEarly: false })
    .then(() => {
      setErrors({});
    })
    .catch((validationErrors) => {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    });
}