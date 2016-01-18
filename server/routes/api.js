var db = require('./../db/config').db;
var pgp = require('./../db/config').pgp;
function sql(file) {
    return new pgp.QueryFile(file, {debug: true, minify: true});
}
var sqlAddUser = sql('./../db/insertStudent.sql');

module.exports = function (app) {
  app.post('/student', function (req, res) {
    db.query('INSERT INTO knowit_schema.student(id, username, firstname, lastname, email) VALUES (${id}, ${username}, ${firstname}, ${lastname}, ${email})', {id: 2, username: 'peay', firstname: 'Preethi', lastname: 'Kasireddy', email: 'iam.prehi.k@gmail.com'})
      .then(user=> {
          console.log("USER:", user);
          res.send('success!');
      })
      .catch(error=> {
          console.log("ERROR:", error);
          res.sendStatus(501, error);
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
  })
};
