const { body, validationResult } = require('express-validator')

exports.validateUser = [
  body('name').isAlpha().isLength({ min: 3, max: 255 }),
  body('username').isLength({ min: 3, max: 255 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
]