var db = require('./../db/config').db;
var pgp = require('./../db/config').pgp;
var sqlAddUser = require('./../db/queries').sqlAddUser;

module.exports = function (app) {
  app.post('/student', function (req, res) {
    db.one(sqlAddUser, {username: 'newUser', firstname: 'Something', lastname: 'else', email: 'something@gmail.com'})
        .then(() => {
            res.send('success!');
        })
        .catch(error => {
            console.log("ERROR:", error);
        });
  });

  app.get('/student', function (req, res) {
    db.query('SELECT * from knowit_schema.student')
      .then(students => {
        res.json(students);
      })
      .catch(error => {
        res.sendStatus(501, error);
      });
  });

};
