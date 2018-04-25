//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');

    /*
    db.collection('Todo').insertOne({
        text: "Stab Ricky",
        completed: false

    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo ', err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));

    });
*/



    db.collection('Users').insertOne({
        name: "Ricky",
        age: 27,
        location: 'Leeds'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user ', err);
        }

        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close()

    
});