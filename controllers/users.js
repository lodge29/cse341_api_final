const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET ALL
const getAllUsers = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

module.exports = {
    getAllUsers,
}