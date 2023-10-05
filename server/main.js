require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const userModel = require('./models/users');
const PORT = 5000;

mongoose.connect(`mongodb+srv://Juojo:${process.env.MONGO_PASSWORD}@cluster0.1zoa72y.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`);

app.use(express.json()); // Parses json to objects when req.body
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get('/getUsers', (req, res) => {
    const query = {} // Empty object equals to *

    userModel.find(query).then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
        console.error(err);
    })
});

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new userModel(user); // Insert user to collection 'userModel'
    await newUser.save(); // Save the data to mongodb

    console.log('The user ' + user.name + ' was created.');
    res.json(user);
})