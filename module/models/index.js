module.exports = function(config){
    var fs = require('fs');
    const low = require('lowdb');
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr('my secret key');

    const db = low('db.json', {
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
    });

    var method = {};

    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        method[name] = require('./' + name)(db, config);
    });

    return method;
}
