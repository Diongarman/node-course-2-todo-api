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


app.post('/todos', authenticate,(req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e)=> {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate,(req, res) => {

    

    Todo.find({
        _creator: req.user._id
    }).then((todos)=> {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', authenticate,(req, res) => {
    var userId = req.params.id;


    if (!ObjectId.isValid(userId)) {
        console.log('invalid ID!');
        return res.status(404).send()
    }


    Todo.findOne({
        _id: userId,
        _creator: req.user._id
    }).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
    var Id = req.params.id;

    if (!ObjectId.isValid(Id)) {
        return res.status(404).send()
    }

    Todo.findOneAndRemove({
        _id: Id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } 
        
        res.send({todo})
    
    }).catch((e) => res.status(400).send());
});

app.patch('/todos/:id', authenticate,(req, res) => {
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


    Todo.findOneAndUpdate({
        _id: Id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })


});

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

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});



app.listen(port, () => {
    console.log(`started up at port: ${port}`);
});


module.exports = {app}
