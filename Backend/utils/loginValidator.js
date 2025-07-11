const validator = require("validator");

const loginValidator = (req) => {
  const requiredFields = {
    Email: {
      validate: (v) => v && validator.isEmail(v),
      error: "Valid Email is required",
    },
    Password: {
      validate: (v) => !!v,
      error: "Password is required",
    },
  };

  Object.keys(requiredFields).forEach((field) => {
    if (!requiredFields[field].validate(req.body[field])) {
      throw new Error(requiredFields[field].error);
    }
  });
};

module.exports = loginValidator;
