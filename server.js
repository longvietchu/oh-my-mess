// Import dependencies
require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const usersRoute = require('./routes/api/users.route');
const authRoute = require('./routes/api/auth.route');
const chatRoute = require('./routes/api/chat.route');

// Middlewares
const authMiddleware = require('./middlewares/auth.middleware');

// Body Parser Middleware
app.use(express.json());

// User Routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/chat', authMiddleware, chatRoute);

app.get('/', (req, res) => {
    res.send('Hello! This is oh-my-mess');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
