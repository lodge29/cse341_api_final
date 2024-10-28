const express = require('express');
const router = express.Router();

// validation
const { userValidationRules, validate } = require('../validation/validate');
const { isAuthenticated } = require('../middleware/authentication.js');

// user contorller
const users = require("../controllers/users")

// GET ALL & SINGLE
router.get('/', users.getAllUsers);
router.get('/:id', users.getSingleUser)

// POST, PUT, DELETE
router.post('/', isAuthenticated, userValidationRules(), validate, users.createSingleUser)
router.put('/:id', isAuthenticated, userValidationRules(), validate, users.updateSingleUser)
router.delete('/:id', isAuthenticated, users.deleteUser)


module.exports = router;