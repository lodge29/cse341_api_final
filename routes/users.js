const express = require('express');
const router = express.Router();

// validation
const { userValidationRules, validate } = require('../validation/validate');
//const { isAuthenticated } = require('../middleware/authenticate.js');

// user contorller
const users = require("../controllers/users")

// GET ALL & SINGLE
router.get('/', users.getAllUsers);
router.get('/:id', users.getSingleUser)

// POST, PUT, DELETE
router.post('/', userValidationRules(), validate, users.createSingleUser)
router.put('/:id', userValidationRules(), validate, users.updateSingleUser)
router.delete('/:id', users.deleteUser)


module.exports = router;