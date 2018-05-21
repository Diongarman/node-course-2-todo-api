const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


//user seed

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id:userOneId,
    email:'ricky@sticks.com',
    password:'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'tom@gmail.com',
    password: 'userTwoPass'
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};


// todo seeds
const todos = [{
    _id: new ObjectId(),
    text: 'First todo'
},{
    _id: new ObjectId(),
    text: 'Second todo',
    completed: true,
    completedAt: 333
}];


const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() =>  done() )
};

module.exports = {todos, populateTodos, users, populateUsers}