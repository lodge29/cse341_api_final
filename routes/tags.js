const express = require('express');
const router = express.Router();

// validation
const { tagValidationRules, validate } = require('../validation/validate');
const { isAuthenticated } = require('../middleware/authentication.js');

// task controller
const tags = require('../controllers/tags');

// GET
router.get('/', tags.getAllTags);
router.get('/:id', tags.getSingleTag)

// POST, PUT, DELETE
router.post('/', isAuthenticated, tagValidationRules(), validate, tags.createSingleTag);
router.put('/:id', isAuthenticated, tagValidationRules(), validate,tags.updateSingleTag);
router.delete('/:id', isAuthenticated, tags.deleteTag);


module.exports = router;