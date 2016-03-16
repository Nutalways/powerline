module.exports = function (app, db, task, config) {
	var fs = require('fs');

	app.use(function (req, res, next) {
		res.locals.user = req.session.user;
		next();
	});

	function ensureAuthorized(req, res, next) {
		if (req.session.user) {
			next();
		} else {
			res.redirect('/login');
		}
	}

	fs.readdirSync(__dirname).forEach(function (file) {
		if (file == "index.js")
			return;
		var name = file.substr(0, file.indexOf('.'));
		require('./' + name)(app, ensureAuthorized, db, task, config);
	});

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		res.writeHead(404, {
			"Content-Type" : "text/plain"
		});
		res.write("404 Not Found\n");
		res.end();
	});

}
