var db = require('./config').db;
var pgp = require('./config').pgp;
var sqlAddUser = sql('./insertStudent.sql');

db.one(sqlAddUser, {id: 1, username: 'peekay', firstname: 'Preethi', lastname: 'Kasireddy', email: 'iam.preethi.k@gmail.com'})
    .then(user=> {
        console.log("USER:", user);
    })
    .catch(error=> {
        console.log("ERROR:", error);
    });
