module.exports = function (http, db, serial, config) {
	var fs = require('fs');
	var io = require('socket.io')(http);
	io.on('connection', function (socket) {
		fs.readdirSync(__dirname).forEach(function (file) {
			if (file == "index.js")
				return;
			var name = file.substr(0, file.indexOf('.'));
			require('./' + name)(io, socket, db, serial, config);
		});
	});
};
