module.exports = function (cronJob, timeZone, db, serial, config) {
	var method = {};
	var moment = require('moment');
	var working = false;
	var deviceId = undefined;

	var timerService = new cronJob({
			cronTime : '* * * * * *',
			onTick : function () {
				var current = new Date();
				var timerObj = db.timer.getIncomingByDeviceId(deviceId, '1');
				var timerObj2 = db.timer.getIncomingByDeviceId(deviceId, '0');
				if (timerObj != null) {
					if (current.getHours() == timerObj.h && current.getMinutes() == timerObj.m && !timerObj.update) {
						if (db.timer.setUpdate(timerObj.id)) {
							serial.serial.send(deviceId, 'on');
						}
					}
				}
				if (timerObj2 != null) {
					if (current.getHours() == timerObj2.h && current.getMinutes() == timerObj2.m && !timerObj2.update) {
						if (db.timer.setUpdate(timerObj2.id)) {
							serial.serial.send(deviceId, 'off');
						}
					}
				}
			},
			onComplete : function () {
				console.log(moment.utc().toDate().getTime(), "=====>", deviceId, "timer task stop");
			},
			start : false,
			timeZone : timeZone
		});

	method['start'] = function () {
		if (deviceId != undefined) {
			console.log(moment.utc().toDate().getTime(), "=====>", deviceId, "timer task start");
			timerService.start();
			working = true;
		}
	};

	method['stop'] = function () {
		timerService.stop();
		working = false;
	};

	method['setDeviceId'] = function (data) {
		deviceId = data;
	};

	method['deviceId'] = function () {
		return deviceId;
	};

	method['status'] = function () {
		return working;
	};

	return method;
};
