const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// get all users
const getAllTasks = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('tasks').find();
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

// get single user
const getSingleTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tasks').find({ _id: taskId });
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

// create single user
const createSingleTask = async (req, res) => {
    const tasks = {
        task: req.body.task,
        tag: req.body.tag
    };
    const response = await mongodb.getDatabase().db().collection('tasks').insertOne(tasks);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error creating task');
    }
};

// update single user
const updateSingleTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const tasks = {
        task: req.body.task,
        tag: req.body.tag
    };
    const response = await mongodb.getDatabase().db().collection('tasks').replaceOne({_id: taskId}, tasks);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error updating task');
    }
};

// delete single user
const deleteTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({_id: taskId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error deleting task');
    }
};

module.exports = {
    getAllTasks,
    getSingleTask,
    createSingleTask,
    updateSingleTask,
    deleteTask
}