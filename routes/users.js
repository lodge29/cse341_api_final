const express = require('express');
const router = express.Router();

// user contorller
const users = require("../controllers/users")


router.get('/', users.getAllUsers);
//router.get('/:id', users.getSingleUser)
//router.post('/', users.createUser)
//router.put('/', users.updateUser)
//router.delete('/', users.deleteUser)


module.exports = router;