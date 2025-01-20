// utils/logMiddleware.js
const morgan = require('morgan');
const Log = require('../database/mongo-db/schemas/Log');

const logger = morgan(
  ':method :url :status :response-time ms',
  {
    stream: {
      write: async (message) => {
        const [method, url, status, responseTime] = message.trim().split(" ");
        const logEntry = new Log({ method, url, status: Number(status), responseTime: Number(responseTime) });
        await logEntry.save();
      },
    },
  }
);

module.exports = logger;