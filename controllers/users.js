const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// get all users
const getAllUsers = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// get single user
const getSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// create single user
const createSingleUser = async (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.statuse(500).json(response.error || 'Error updating the user');
    }
};

// update single user
const updateSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error updating the user');
    }
};

// delete single user
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error deleting the user');
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createSingleUser,
    updateSingleUser,
    deleteUser
}