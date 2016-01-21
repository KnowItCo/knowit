var db = require('./config').db;
var pgp = require('./config').pgp;
var path = require('path');

function sql(file) {
    return new pgp.QueryFile(file, {debug: true, minify: true});
}

module.exports = {
  sqlAddUser: sql(path.join(__dirname, 'insertStudent.sql')),
  sqlFindUser: sql(path.join(__dirname, 'findStudent.sql')),
  sqlAddLearnable: sql(path.join(__dirname, 'addLearnable.sql')),
  sqlFindStudentId: sql(path.join(__dirname, 'findStudentId.sql')),
  sqlGetLearnablesById: sql(path.join(__dirname, 'getLearnablesById')),
  sqlFindStudentById: sql(path.join(__dirname, 'findStudentById'))
};
