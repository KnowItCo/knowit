var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);

// Database connection details;
var cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'knowit',
    user: 'peekay',
    password: 'knowit123'
};

var db = pgp(cn);

module.exports = {
  db: db,
  pgp: pgp
};



// db.query("select * from users where active=$1", true)
//     .then(function (data) {
//         console.log("DATA:", data); // print data;
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error); // print the error;
//     })
//     .finally(function () {
//         // If we do not close the connection pool when exiting the application,
//         // it may take 30 seconds (poolIdleTimeout) before the process terminates,
//         // waiting for the connection to expire in the pool.
//
//         // But if you normally just kill the process, then it doesn't matter.
//
//         pgp.end(); // for immediate app exit, closing the connection pool.
//
//         // See also:
//         // https://github.com/vitaly-t/pg-promise#library-de-initialization
//     });
