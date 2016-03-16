module.exports = function (cronJob, timeZone, db, config) {
	var method = {};
	var moment = require('moment');
	var working = false;
	var deviceId = undefined;

	var timerService = new cronJob({
			cronTime : '* * * * * *',
			onTick : function () {
				var current = new Date();
				//console.log(moment.utc().toDate().getTime(), "=====>", deviceId);
			},
			onComplete : function () {
				console.log(moment.utc().toDate().getTime(), "=====>", deviceId, "timer task stop");
			},
			start : false,
			timeZone : timeZone
		});

	method['start'] = function () {
		console.log(moment.utc().toDate().getTime(), "=====>", deviceId, "timer task start");
		timerService.start();
		working = true;
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
