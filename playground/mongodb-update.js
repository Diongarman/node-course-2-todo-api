const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');


    //findOneAndUpdate
/*
    db.collection('Todo').findOneAndUpdate({
        _id: new ObjectID("5addeb023c27c2623424ea0e")
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
*/

    db.collection('Users').findOneAndUpdate({
        _id: 123
    }, {
        $set: {
            name: 'Athelstan'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close();


})
