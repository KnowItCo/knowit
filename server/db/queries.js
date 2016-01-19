var db = require('./config').db;
var pgp = require('./config').pgp;
var path = require('path');

function sql(file) {
    return new pgp.QueryFile(file, {debug: true, minify: true});
}

module.exports = {
  sqlAddUser: sql(path.join(__dirname, 'insertStudent.sql')),
};
