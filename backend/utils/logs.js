const DBLogs = require('../database/mongo-db/schemas/DBLog');

const logDB = async (message) => {
  try {
    const newLog = new DBLogs({ message });
    await newLog.save();
    console.log('Log added successfully');
  } catch (error) {
    console.error('Error adding log:', error);
  }
};

module.exports = logDB;
