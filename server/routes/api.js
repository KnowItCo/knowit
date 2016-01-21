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

  app.get('/student/:email', function (req, res) {
    const email = req.params.email;
    db.query('SELECT * from knowit_schema.student WHERE email=${email}', { email })
      .then(student => {
        res.json(student);
      })
      .catch(error => {
        res.sendStatus(501, error);
      });
  });

};
