module.exports = function (app, ensureAuthorized, db, config) {

	app.get('/home', ensureAuthorized, function (req, res) {
		var list = db.device.list();
		res.render('device/home', {
			list : list
		});
	});

	app.get('/home/device/:id/info', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		if (id) {
			var device = db.device.getById(id);
			var timer = db.timer.list(id);
			if (device && timer) {
				res.render('device/device', {
					device : device,
					timer : timer
				});
			}
		} else {
			res.send(404);
		}
	});
	app.get('/home/device/:id/time/add', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		if (id) {
			var device = db.device.getById(id);
			if (device) {
				res.render('device/time', {
					device : device
				});
			}
		} else {
			res.send(404);
		}
	});
	app.post('/home/device/:id/time/add', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		if (id) {
			var device = db.device.getById(id);
			if (device) {
				var input = req.body;
				var timerObj = db.timer.create({
						deviceId : device.id,
						h : input.h,
						m : input.m,
						set : input.set
					});
				if (timerObj) {
					res.redirect('/home/device/' + device.id + '/info');
				} else {
					res.redirect('/home/device/' + device.id + '/time/add');
				}
			} else {
				res.send(404);
			}
		}
	});
	app.get('/home/device/:id/time/:tid/update', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		var tid = req.params.tid;
		if (id && tid) {
			var device = db.device.getById(id);
			var timerObj = db.timer.getById(tid);
			if (device && timerObj) {
				res.render('device/timeset', {
					device : device,
					timer : timerObj
				});
			} else {
				res.redirect('/home/device/' + device.id + '/info');
			}
		} else {
			res.send(404);
		}
	});
	app.post('/home/device/:id/time/:tid/update', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		var tid = req.params.tid;
		if (id && tid) {
			var device = db.device.getById(id);
			var timerObj = db.timer.getById(tid);
			console.log(device, timerObj);
			if (device && timerObj) {
				var input = req.body;
				var timerObj = db.timer.update({
						id : timerObj.id,
						h : input.h,
						m : input.m,
						set : input.set
					});
				if (timerObj) {
					res.redirect('/home/device/' + device.id + '/info');
				} else {
					res.redirect('/home/device/' + device.id + '/time/' + tid + '/update');
				}

			} else {
				res.redirect('/home/device/' + device.id + '/time/' + timerObj.id + '/update');
			}
		} else {
			res.send(404);
		}
	});
	app.get('/home/device/:id/time/:tid/delete', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		var tid = req.params.tid;
		if (id && tid) {
			var device = db.device.getById(id);
			var timerObj = db.timer.getById(tid);
			if (device && timerObj) {
				var timerObj = db.timer.removeById(timerObj.id);
				if (timerObj) {
					res.redirect('/home/device/' + device.id + '/info');
				} else {
					res.render('device/timeset', {
						device : device,
						timer : timerObj
					});
				}

			} else {
				res.send(404);
			}
		} else {
			res.send(404);
		}
	});

	app.get('/home/device/add', ensureAuthorized, function (req, res) {
		res.render('device/add');
	});

	app.post('/home/device/add', ensureAuthorized, function (req, res) {
		var name = req.body.devicename;
		var type = req.body.devicetype;
		if (name && type) {
			var device = db.device.create({
					name : name,
					type : type
				});
			if (device) {
				res.redirect('/home');
			} else {
				res.render('device/add', {
					errMesg : 'add fail !'
				});
			}
		} else {
			res.render('device/add', {
				errMesg : 'add fail !'
			});
		}
	});

	app.get('/home/device/:id/delete', ensureAuthorized, function (req, res) {
		var id = req.params.id;
		console.log(id);
		if (id) {
			var device = db.device.removeById(id);
			if (device) {
				res.redirect('/home');
			} else {
				res.send(404);
			}
		} else {
			res.send(404);
		}
	});

};
