const mongodb = require('../data/database');

// gets names of tags in collection:tags for validation
const getTags = async () => {
  try {
    const tags = await mongodb.getDatabase().db().collection('tags').find().toArray();
    const tagNames = tags.map(tag => tag.tag);
    console.log("Tag names allowed: " + tagNames)
    return tagNames;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = { getTags }