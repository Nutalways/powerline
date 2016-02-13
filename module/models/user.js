module.exports = function(db, config) {

  const Cryptr = require('cryptr');
  const cryptr = new Cryptr(config.secretKey);
  var method = {};

  method['auth'] = function(data) {
    /*
      data = jsonObj;
    */
    data.password = cryptr.encrypt(data.password);
    return db('user').find(data);
  };

  method['find'] = function(data) {
    /*
      data = jsonObj;
    */
    return db('user').find(data);
  };

  return method;
}
