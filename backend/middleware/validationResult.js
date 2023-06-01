const { validationResult } = require("express-validator");
exports.validateResult = (req, res, next) => {
  const validationRes = validationResult(req);

  if (!validationRes.isEmpty()) {
    const errors = [];

    for (let i = 0; i < validationRes.array().length; i++) {
      const param = validationRes.array()[i].param;
      const msg = validationRes.array()[i].msg;
      const findProp = errors.findIndex((item) => item[param]);
      if (findProp < 0) {
        let valObj = {};
        valObj[param] = [msg];
        errors.push(valObj);
      } else {
        errors[findProp][param].push(msg);
      }
    }
    return res.status(400).json({
      message: "Validasi error",
      errorValidate: errors,
    });
  }
  next();
};
