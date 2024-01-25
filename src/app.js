const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { swaggerUi, swaggerSpec } = require('./swagger');
const db = require("../models");

app.use(bodyParser.json());

// Implement CORS and other global middleware as needed

// Routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Swagger setup
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(errorMiddleware);

// Check db
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});