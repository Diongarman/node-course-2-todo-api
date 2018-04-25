const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');


    //deleteMany

    /*
    db.collection('Todo').deleteMany({ 
        text: "Eat lunch" 
      })
      .then((result) => {
        console.log(result);
      })

    */

    //deleteOne

    //findOneAndDelete

    //db.close();

    var userObj = new ObjectID("5added26ee8b4162dd4499f1")

    db.collection('Users').findOneAndDelete({ 
        _id: userObj
      })
      .then((result) => {
        console.log(result);
      })



})
