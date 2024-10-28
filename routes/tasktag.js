const express = require('express');
const router = express.Router();

// validation
//const { taskTagValidationRules, validate } = require('../validation/validate');
const { isAuthenticated } = require('../middleware/authentication.js');

// task controller
const tasktag = require('../controllers/tasktag');

// get all task tags 
router.get('/', tasktag.getTaskTags);
// get tasks using tag names
router.get('/:id', tasktag.getTasksByTag);
// create tasktags collection using tag name
// entering tag name builds a list of all tasks associated with it.
router.post('/:tagName', isAuthenticated, tasktag.createTaskTag);
// delete tasktag using _id
router.delete('/:id', isAuthenticated, tasktag.deleteTaskTag);

module.exports = router;