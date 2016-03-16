module.exports = function (db, config) {
	var method = {};

	method['list'] = function (data) {
		return db('timer').filter({
			deviceId : data
		});
	};
	method['getById'] = function (data) {
		return db('timer').getById(data);
	};
	method['removeById'] = function (id) {
		return db('timer').removeById(id);
	};
	method['update'] = function (data) {
		return db('timer').updateById(data.id, data);
	};

	method['create'] = function (data) {
		/*
		data = { deviceId: '', h: '', m:'', set: 0};
		 */
		var timerId = undefined;
		var deviceObj = db('device').getById(data.deviceId);
		if (deviceObj) {
			var timer = JSON.parse(JSON.stringify(config.db.timer));
			timer.deviceId = deviceObj.id;
			timer.h = data.h;
			timer.m = data.m;
			timer.set = data.set;
			timer.status = false;
			timerId = db('timer').insert(timer).id;
		}
		return timerId ? true : false;
	};

	return method;
}
