// index.js

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const loggerMiddleware = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Routes
app.use('/users-api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
