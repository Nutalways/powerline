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
	method['setUpdate'] = function (data) {
		var timerObj = db('timer').getById(data);
		var memId = undefined;
		if (timerObj) {
			timerObj.update = true;
			timerObj = db('timer').updateById(timerObj.id, timerObj);
			if (timerObj) {
				memId = timerObj.id;
				timerObj = db('timer').filter({
						deviceId : timerObj.deviceId,
						set : timerObj.set
					});
				if (timerObj) {
					for (var i in timerObj) {
						if (timerObj[i].id != memId) {
							timerObj[i].update = false;
							db('timer').updateById(timerObj[i].id, timerObj[i]);
						}
					}
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	method['getIncomingByDeviceId'] = function (data, inset) {
		var timerObj = db('timer').filter({
				deviceId : data,
				set : inset,
				status : true
			});
		var current = new Date();
		timerObj.sort(function (a, b) {
			if (a.h > b.h)
				return true;
			return a.m > b.m;
		});
		for (var i in timerObj) {
			if (timerObj[i].h > current.getHours()) {
				return timerObj[i]
			} else if (timerObj[i].h == current.getHours() && timerObj[i].m >= current.getMinutes()) {
				return timerObj[i]
			}
		}
		return null;
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
			timer.update = false;
			timer.set = data.set;
			timer.status = false;
			timerId = db('timer').insert(timer).id;
		}
		return timerId ? true : false;
	};

	return method;
}
