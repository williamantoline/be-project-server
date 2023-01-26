const { check, validationResult } = require('express-validator');
const model = require("../models/index");

exports.validateUser = [
  check('name')
    .notEmpty()
    .withMessage('Name is required').bail()
    .isLength({ min: 3, max: 255 })
    .withMessage('Name must have a minimum length of 3').bail()
    .isAlpha()
    .withMessage("The name should contain only letters").bail(),
  check('username')
    .notEmpty()
    .withMessage('Username is required').bail()
    .isLength({ min: 3, max: 255 })
    .withMessage('Username must have a minimum length of 3').bail()
    .custom(value => {
      return model.users.findOne({where: {username: value}})
        .then((result) => {
          if(result)
            return Promise.reject('Username already exists')
        })
    }),
  check('email')
    .notEmpty()
    .withMessage('Email is required').bail()
    .isEmail()
    .withMessage('Email is Invalid').bail()
    .custom(value => {
      return model.users.findOne({where: {email: value}})
        .then((result) => {
          if(result)
            return Promise.reject('Email already exists')
        })
    }),
  check('password')
    .notEmpty()
    .withMessage('Password is required').bail()
    .isLength({ min: 8, max: 255 })
    .withMessage('Password must have a minimum length of 8').bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
]