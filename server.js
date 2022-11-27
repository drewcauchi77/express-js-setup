const express = require('express');
const app = express();

// Usage for static files to be loaded - folder structure can be nested
app.use(express.static('public'));
// Express does not let us access the request body so we need middleware for that
// Allows to access information from forms
app.use(express.urlencoded({ extended: true }));
// Just like URLencoded, json is a middleware that allows you to parse JSON
app.use(express.json());
// Can use also PUG
app.set('view engine', 'ejs');
// Usage of middleware should come before to operate on all routes
app.use(logger);

// Get, Post, Put, Delete, Patch etc..
app.get('/', (req, res) => {
    // Cannot set headers after they are sent to the client ie. cannot send text and set a status after
    // res.send('Home');
    // res.json({ message: 'Success' })
    // res.download('server.js');
    // res.status(500).send('Something went wrong!!');
    // res.status(500).json({ message: 'Error' });

    // Render accepts object with properties that are then passed to the views
    res.render('index', {text: 'Andrew'});
    // Index EJS has a default value set in locals when text is not properly passed from here
    // res.render('index', {text1234: 'Andrew'});
});

// Middleware can be used specifically for one route only as well
// app.get('/', logger, (req, res) => {
//     res.render('index', {text: 'Andrew'});
// });

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// This logger is middleware - Middleware works from top to bottom
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(3030);