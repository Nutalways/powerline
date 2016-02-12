module.exports = function(app, db, config){
    var fs = require('fs');

    function ensureAuthorized(req, res, next){
      next();
    }

    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app, ensureAuthorized, db, config);
    });
}
