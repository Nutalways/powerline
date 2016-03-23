module.exports = function (db,config) {
	var method = {};
	var fs = require('fs');
	var serial = require('serialport');
	
	fs.readdirSync(__dirname).forEach(function (file) {
		if (file == "index.js")
			return;
		var name = file.substr(0, file.indexOf('.'));
		method[name] = require('./' + name)(db, serial, config);
	});
	return method;
};