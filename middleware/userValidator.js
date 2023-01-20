const { body, validationResult } = require('express-validator')

exports.validateUser = [
  body('name').notEmpty().isAlpha().isLength({ min: 3, max: 255 }),
  body('username').notEmpty().isLength({ min: 3, max: 255 }),
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isLength({ min: 8, max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
]