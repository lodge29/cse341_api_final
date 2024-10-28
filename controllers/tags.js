const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// get all tags
const getAllTags = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('tags').find();
    result.toArray().then((tag) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tag);
    });
};

// get single tag
const getSingleTag = async (req, res) => {
    const tagId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tags').find({ _id: tagId });
    result.toArray().then((tag) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tag);
    });
};

// create single tag
const createSingleTag = async (req, res) => {
    const tag = {
        tag: req.body.tag
    };
    const response = await mongodb.getDatabase().db().collection('tags').insertOne(tag);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error creating tag');
    }
};

// update single tag
const updateSingleTag = async (req, res) => {
    const tagId = new ObjectId(req.params.id);
    const tag = {
        tag: req.body.tag
    };
    const response = await mongodb.getDatabase().db().collection('tags').replaceOne({_id: tagId}, tag);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error updating tag');
    }
};

// delete single tag
const deleteTag = async (req, res) => {
    const tagId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tags').deleteOne({_id: tagId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.statuse(500).json(response.error || 'Error deleting tag');
    }
};

module.exports = { getAllTags, getSingleTag, createSingleTag, updateSingleTag, deleteTag }