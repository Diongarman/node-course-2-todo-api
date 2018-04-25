const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');


/*
    db.collection('Todo').find({
        completed: false
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
            console.log('Unable to fetch todos', err);
        });
*/

/*
    db.collection('Todo').find().count().then((count) => {
        console.log(`Todos: ${count}`)
    }, (err) => {
        console.log('Unable to fetch todo count', err);
    });

*/


    db.collection('Users').find({name:'Kaila'}).count().then((count) => {
        console.log(`Todo count: ${count}`);
    }, (err) => {
        console.log('unable to fetch todo count', err)
    });

    //db.close();
})
