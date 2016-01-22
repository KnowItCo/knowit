var db = require('./../db/config').db;
var pgp = require('./../db/config').pgp;
var sqlAddUser = require('./../db/queries').sqlAddUser;
var sqlFindStudentId = require('./../db/queries').sqlFindStudentId;
var sqlAddLearnable = require('./../db/queries').sqlAddLearnable;
var sqlGetLearnablesById = require('./../db/queries').sqlGetLearnablesById;
var sqlFindStudentById = require('./../db/queries').sqlFindStudentById;
var sqlDeleteLearnableById = require('./../db/queries').sqlDeleteLearnableById;

module.exports = function (app) {
  app.post('/student', function (req, res) {
    db.query(sqlAddUser, {username: 'New Preethi', firstname: 'Fake', lastname: 'Name', email: 'lalala@gmail.com'})
        .then(() => {
            res.send('success!');
        })
        .catch(error => {
            console.log('ERROR: ', error);
        });
  });

  app.post('/learnable', function (req, res) {
    const email = req.body.email;
    const tags = req.body.tags;

    const learnable = {
      text: req.body.text,
      tags: '{' + tags + '}',
    };
    db.query(sqlFindStudentId, { email })
      .then(id => {
        if (!id) {
          throw new Error('Could not find user in database. ' + error);
        } else {
          learnable.userid = id[0].id;
          return learnable;
        }
      })
      .then(learnable => {
        return db.query(sqlAddLearnable, learnable)
      })
      .then(() => {
        res.send('Success!');
      })
      .catch(error => {
        console.log('ERROR: ', error);
      });
  });

  app.get('/learnable/:email', function (req, res) {
    const email = req.params.email;
    db.query(sqlFindStudentId, { email })
      .then(id => {
        if (!id) {
          throw new Error('Could not find user in database. ' + error);
        } else {
          return id[0].id;
        }
      })
      .then(id => {
        return db.query('SELECT * FROM knowit_schema.learnable WHERE userid=${userid}', { userid: id })
      })
      .then((learnables) => {
        res.json(learnables);
      })
      .catch(error => {
        res.sendStatus(501, error);
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

  app.delete('/learnable/:id', function(req, res) {
    const id = req.params.id;
    db.query('DELETE FROM knowit_schema.learnable WHERE id=${id}', { id })
      .then(() => {
        res.send('Successfully deleted!');
      })
      .catch(error => {
        res.sendStatus(501, error);
      });
  });

  app.get('/learnable', function (req, res) {
    db.query('SELECT * from knowit_schema.learnable')
      .then(learnables => {
        res.json(learnables);
      })
      .catch(error => {
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
  });

};
