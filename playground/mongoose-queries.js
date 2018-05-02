const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5ae9eddaa78792b0206863c88';

// if (!ObjectId.isValid(id)) {
//     console.log('ID not valid');
// }


// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Todo By Id', todo)
// }).catch((e) => console.log(e));

var userId = '5ae1eeb6cdf48407a07895e8';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log('User', user);
}).catch((e) => console.log(e));