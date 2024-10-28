const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('users').find().toArray();
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.statuse(500).json(result.error || 'Server error');
    }
};
  

// get single user
const getSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray();
    try {
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No user found' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.statuse(500).json(result.error || 'Server error');
    }};

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