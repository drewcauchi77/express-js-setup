const express = require('express');
const router = express.Router();

// Dummy users
const users = [{ name: 'Andrew' }, { name: 'Kristina' }];

// Router knows that these routes need to start with /users
router.get('/', (req, res) => {
    // Used to access URL such as /users?name=Andrew
    // console.log(req.query.name);
    res.send('All Users List');
});

router.get('/new', (req, res) => {
    res.render('users/new', { firstName: 'John' });
});

// This POST request goes to the form POST method action in /new
router.post('/', (req, res) => {
    // Check if name through form has numbers and check if valid
    const isNameValid = /\d/.test(req.body.firstName) ? false : true;
    if(isNameValid) {
        // Push to array of users created at the top
        users.push({ name: req.body.firstName });
        // Go to the page of the new user
        res.redirect(`/users/${users.length - 1}`);
    } else {
        console.log('Error');
        // If there is an error, re-render the page with the error name as placeholder of the form
        res.render('users/new', { firstName: req.body.firstName });
    }
});

// Dynamic routes should always be at the end
// If /new is created after the dynamic route below, new will be replaced with the ID dynamic route
// router.get('/:id', (req, res) => {
//     res.send(`GET User ID: ${req.params.id}`)
// });

// router.put('/:id', (req, res) => {
//     res.send(`UPDATE User ID: ${req.params.id}`)
// });

// router.delete('/:id', (req, res) => {
//     res.send(`DELETE User ID: ${req.params.id}`)
// });

// The route function takes care of getting all the above together into 1 since the route is the same
router.route('/:id')
    .get((req, res) => {
        // console.log(req.user)
        res.send(`GET User ID: ${req.params.id} ... Name: ${req.user.name}`);
    })
    .put((req, res) => {
        res.send(`UPDATE User ID: ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`DELETE User ID: ${req.params.id}`);
    });

// Whenever a parameter in the request is found matching id - do this
// param function is a type of middleware - middleware runs before GET, PUT and DELETE
router.param('id', (req, res, next, id) => {
    // We are adding a property to the request and then can show it on GET for example
    req.user = users[id];
    // It is important to call next otherwise, we cannot continue
    next();
});

module.exports = router;