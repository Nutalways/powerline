module.exports = function(config) {
  var fs = require('fs');

  const low = require('lowdb');
  const fileSync = require('lowdb/file-sync')
  const Cryptr = require('cryptr');
  const cryptr = new Cryptr(config.secretKey);
  const jwt = require('jsonwebtoken');

  const db = low('db.json', {
      storage: {
        write: fileSync.write,
        read: fileSync.read
      },
      format: {
        deserialize: (str) => {
          const decrypted = cryptr.decrypt(str)
          const obj = JSON.parse(decrypted)
          return obj
        },
        serialize: (obj) => {
          const str = JSON.stringify(obj)
          const encrypted = cryptr.encrypt(str)
          return encrypted
        }
      }
    },
    true);
  db._.mixin(require('underscore-db'));

  if (db.object.user == undefined) {
    var user = JSON.parse(JSON.stringify(config.db.user));
    user.email = 'admin@powerline.local';
    user.password = cryptr.encrypt('password');
    delete user['token'];
    const userId = db('user').insert(user).id;
    var userobj = db('user').getById(userId);
    userobj['token'] = jwt.sign(userobj, config.secretKey);
    userobj = db('user').updateById(userId, userobj);
    if (userobj) {
      console.log('system', ':', 'model', ':', 'Initial user database complete !');
    }
  }
  if (db.object.timer == undefined) {
    db.object.timer = [];
    db.write();
    console.log('system', ':', 'model', ':', 'Initial timer database complete !');
  }
  if (db.object.device == undefined) {
    db.object.device = [];
    db.write();
    console.log('system', ':', 'model', ':', 'Initial device database complete !');
  }

  var method = {};

  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf('.'));
    method[name] = require('./' + name)(db, config);
  });

  return method;
}
