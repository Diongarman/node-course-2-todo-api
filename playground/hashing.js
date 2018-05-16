const {SHA256} = require("crypto-js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// })


var hashedPassword = '$2a$10$EneL.qFbLn23TUHVR.iZjeI8.FDxOnFX8BaNIDYcLfKp4Wy2cUaFq';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'abc123younme');
// console.log(token)
// var decoded = jwt.verify(token, 'abc123younme');

// console.log(decoded);



//


// var message = "Password123";

// var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);


// //Below is a manual version of how jwt's work

// // 'data' is sent back to client
// var data = {
//     id: 4
// };

// // we create and send to client
// //the salting of the hash prevents user changing data then hashing that
// //This works because user doesn't know our salt
// //we randomly generate salt so that we don't get the same value every time
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'salt').toString()
// }


// //this is what a hacked would try
// token.data.id = 4
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(data) + 'salt').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, do not trust');
// }