export const validateYup = (schema, formObj) => {
  return new Promise((resolve, reject) => {
    schema
      .validate(formObj, {
        abortEarly: false,
      })
      .catch((err) => {
        let errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = { message: e.message };
        });
        reject(errors);
      })
      .then(resolve);
  });
};