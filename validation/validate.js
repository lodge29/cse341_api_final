const { body, validationResult } = require('express-validator');

const userValidationRules = () => {  
  return [
    // 
    body('name')
    .trim()
    .escape()
    .notEmpty().withMessage('Cannot be left empty')
    .isString().withMessage('Letters only')
    .isLength({ min: 2 }).withMessage('Length must be 2 letters or more')
    .withMessage("Enter valid name"),
    // 
    body('age')
    .trim()
    .escape()
    .notEmpty().withMessage('Cannot be left empty')
    .isInt().withMessage('Must be integer')
    .isLength({ min: 2 }).withMessage('2 or more numbers')
    .withMessage('Enter valid age'),
    // 
    body('email')
    .trim()
    .escape()
    .notEmpty().withMessage('Cannot be empty')
    .isEmail().withMessage('Must be email format: name@domain.com')
    .withMessage('Enter valid email'),
    //
    body('birthday')
    .trim()
    .escape()
    .notEmpty().withMessage('Cannot be left empty')
    .withMessage("Enter valid birthday"),
  ]
}

const taskValidationRules = () => {
  return [
    // 
    body('task')
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Task: minimum 2 characters and cannot be blank"),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err =>
    extractedErrors.push({ [err.param] : err.msg })
  )

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = { userValidationRules, taskValidationRules, validate }