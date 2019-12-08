const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// to have environment variables in .env files
require('dotenv').config();

// creating express server
const app = express();
const port = process.env.PORT || 5000;

// a middleware to parse json
app.use(cors());
app.use(express.json());

// connecting to the database URI from MongoDB dashboard
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// creating the routes
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

// starts the server
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
