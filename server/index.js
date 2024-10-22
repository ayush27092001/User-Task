const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Correct usage of CORS

// Routes
app.use('/api/users', userRoutes);

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/sukriti')
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.listen(3001, () => {
    console.log("Server is running on 3001");
});
