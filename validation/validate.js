
const { body, validationResult } = require('express-validator');
const { getTags } = require('../model/validation-tags');

//const tagsPermitted = ['high', 'low'];

// USERS
const userValidationRules = () => {  
  return [
    // 
    body('name')
    .trim()
    .escape()
    .notEmpty().withMessage('Cannot be empty')
    .isString().withMessage('Letters only')
    .isLength({ min: 2 }).withMessage('Length must be 2 letters or more'),
    // 
    body('age')
    .trim()
    .escape()
    .notEmpty().withMessage('Cannot be left empty')
    .isInt().withMessage('Must be integer'),
    // 
    body('email')
    .trim()
    .escape()
    .notEmpty()
    .isEmail().withMessage('Enter valid email: name@domain.com'),
    //
    body('birthday')
    .trim()
    .escape()
    .notEmpty().withMessage("Enter valid birthday"),
  ]
}

// TASKS
// custom validation using collection: tags
// user must enter what's in collection: tags
const taskValidationRules = () => {
  return [
    body('task')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 }).withMessage("Invalid entry. Minimum 2 characters and not empty"),
    body('tag')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 }).withMessage("Invalid entry. Minimum 2 characters and not empty")
      .custom(async (value) => {
        const allowedTags = await getTags();
        if (!allowedTags.includes(value)) {
          throw new Error('Invalid tag value. Must be one of: ' + allowedTags.join(", "));
        }
        return true;
      })
  ];
};

// TAGS
const tagValidationRules = () => {
  return [ 
    body('tag')
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Invalid entry. Enter valid tag name.")
  ]
}



// template for all validations
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err =>
    extractedErrors.push({ [err.path] : err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


module.exports = { userValidationRules, taskValidationRules, tagValidationRules, validate  }