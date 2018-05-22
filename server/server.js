require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e)=> {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos)=> {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/{id}

app.get('/todos/:id', (req, res) => {
    var userId = req.params.id;
    // valid id using isValid
        //404 - send back empty send

    if (!ObjectId.isValid(userId)) {
        console.log('invalid ID!');
        return res.status(404).send()
    }

    // findById
     //success case
        // if todo - send it back
        // if no todo - send back 404 with empty body


    Todo.findById(userId).then((todo) => {
        if (!todo) {
            console.log('Id is valid but dne');
            return res.status(404).send();
        } 
        // good to return todo on an object, {todo}, so down the line have flexibility to customise 
        //the responses by attaching onto it's object
        res.send({todo});
    
    // error
        // 400 - and send empty body back
    }).catch((e) => res.status(400).send());


  
});

// DELETE /todos/{id}

app.delete('/todos/:id', (req, res) => {
    var Id = req.params.id;

    if (!ObjectId.isValid(Id)) {
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(Id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } 
        
        res.send({todo})
    
    }).catch((e) => res.status(400).send());
});


app.patch('/todos/:id', (req, res) => {
    var Id = req.params.id;

    //_pick gives us a subset of things user passed
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(Id)) {
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed) {
        //add current time stamp to completed at
        body.completedAt = new Date().getTime();
    } else {
        //make sure completed at is empty
        body.completed = false;
        body.completedAt = null;
    }


    Todo.findByIdAndUpdate(Id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })


});


// POST /users
app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


// POST /users/login {email, password}

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);



    User.findByCredentials(body.email, body.password).then((user) => {
        // create token
        
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });


});


app.listen(port, () => {
    console.log(`started up at port: ${port}`);
});


module.exports = {app}
