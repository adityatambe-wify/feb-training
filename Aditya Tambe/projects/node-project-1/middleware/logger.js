
const fs = require('fs');

function logger(req, res, next) {
    const logData = `Method: ${req.method}, Timestamp: ${new Date().toISOString()}, Body: ${JSON.stringify(req.body)}\n`;

    fs.appendFile('user.txt', logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
}

module.exports = logger;
