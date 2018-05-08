var express = require('express');
var bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

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
        console.log('allah hu akbar');
        return res.status(400).send()
    }

    // findById
     //success case
        // if todo - send it back
        // if no todo - send back 404 with empty body


    Todo.findById(userId).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } 
        // good to return todo on an object, {todo}, so down the line have flexibility to customise 
        //the responses by attaching onto it's object
        res.send({todo});
    
    // error
        // 400 - and send empty body back
    }).catch((e) => res.status(400).send());


  
});

app.listen(3000, () => {
    console.log('started on port 3000');
});


module.exports = {app}
