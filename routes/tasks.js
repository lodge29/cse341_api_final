const express = require('express');
const router = express.Router();

// validation
const { taskValidationRules, validate } = require('../validation/validate');

// task controller
const tasks = require('../controllers/tasks');

// GET
router.get('/', tasks.getAllTasks);
router.get('/:id', tasks.getSingleTask)

// POST, PUT, DELETE
router.post('/', taskValidationRules(), validate, tasks.createSingleTask)
router.put('/:id', taskValidationRules(), validate, tasks.updateSingleTask)
router.delete('/:id', tasks.deleteTask)


module.exports = router;