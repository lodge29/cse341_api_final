const express = require('express');
const router = express.Router();

// validation
const { taskValidationRules, validate } = require('../validation/validate');
const { isAuthenticated } = require('../middleware/authentication.js');

// task controller
const tasks = require('../controllers/tasks');

// GET
router.get('/', tasks.getAllTasks);
router.get('/:id', tasks.getSingleTask)

// POST, PUT, DELETE
router.post('/', isAuthenticated, taskValidationRules(), validate, tasks.createSingleTask)
router.put('/:id', isAuthenticated, taskValidationRules(), validate, tasks.updateSingleTask)
router.delete('/:id', isAuthenticated, tasks.deleteTask)


module.exports = router;