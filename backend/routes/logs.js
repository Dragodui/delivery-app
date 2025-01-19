const { Router } = require('express');
const Logs = require('../database/mongo-db/schemas/Log');
const DBLogs = require('../database/mongo-db/schemas/DBLog');

const router = Router();

router.post('/logs', async (req, res) => {
  try {
    const { message } = req.body;
    const newLog = new Logs({ message });
    await newLog.save();
    res.status(201).json({ message: 'Log added successfully' });
  } catch (error) {
    console.error('Error adding log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/db-logs', async (req, res) => {
  try {
    const { message } = req.body;
    const newLog = new DBLogs({ message });
    await newLog.save();
    res.status(201).json({ message: 'Log added successfully' });
  } catch (error) {
    console.error('Error adding log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
