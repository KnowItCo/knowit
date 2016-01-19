var db = require('./../db/config').db;
var pgp = require('./../db/config').pgp;
function sql(file) {
    return new pgp.QueryFile(file, {debug: true, minify: true});
}
var sqlAddUser = sql('./../db/insertStudent.sql');

module.exports = function (app) {
  app.post('/student', function (req, res) {
    db.query('INSERT INTO knowit_schema.student(username, firstname, lastname, email) VALUES (${username}, ${firstname}, ${lastname}, ${email})', {username: 'esday', firstname: 'Ptadfhi', lastname: 'Kaasddy', email: 'm.ehi.k@gmail.com'})
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
