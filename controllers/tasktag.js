const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


// get tasks using tag name
const getTasksByTag = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tasktags').find({ _id: id }).toArray();
    try {
      if (result.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'No tasks found for this tag' });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.statuse(500).json(result.error || 'Server error');
    }
  };

// get all tasktags
const getTaskTags = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('tasktags').find();
  result.toArray().then((tasks) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(tasks);
  });
};

// create tasktag record using tag name
  const createTaskTag = async (req, res) => {
    const tagName = req.params.tagName;
    try {
      // Retrieve tasks by tag
      const tasks = await mongodb.getDatabase().db().collection('tasks').find({ tag: tagName }).toArray();
      if (tasks.length > 0) {
        // Extract "task"
        const taskNames = tasks.map(task => task.task);
        // CONSOLE
        console.log("Task names collected: " + taskNames)
        // Insert all tasks into a single tag name
        const response = await mongodb.getDatabase().db().collection('tasktags').updateOne(
          { tag: tagName },
          { $set: { tag: tagName }, $push: { tasks: { $each: taskNames } } },
          { upsert: true }
        );
        if (response.acknowledged) {
          res.status(201).send();
        } else {
          res.status(500).json(response.error || 'Error inserting tasks into tasktags');
        }
      } else {
        res.status(404).json({ message: 'No tasks found for this tag' });
      }
    } catch (error) {
      console.error('Error fetching tasks by tag and inserting into tasktags:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


// delete single user
const deleteTaskTag = async (req, res) => {
  const tagId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('tasktags').deleteOne({_id: tagId});
  try {
    if (response.deletedCount > 0) {
      res.status(200).send();
  } else {
      res.statuse(500).json(response.error || 'Error deleting tasktag');
  }
  } catch (error) {
    console.error('Error fetching tasks by tag and inserting into tasktags:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};


module.exports = { getTasksByTag, createTaskTag, getTaskTags, deleteTaskTag }