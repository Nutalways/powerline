module.exports = function (db, config) {
	var method = {};
	var fs = require('fs');
	var path = require('path');
	var moment = require('moment');
	var cronJob = require('cron').CronJob;
	var timeZone = config.cronJob.timezone;

	fs.readdirSync(__dirname).forEach(function (file) {
		if (file == "index.js" || file == "timer.js")
			return;
		var name = file.substr(0, file.indexOf('.'));
		method[name] = require('./' + name)(cronJob, timeZone, db, config);
	});

	var taskList = [];
	method['system'] = {};
	method['system']['start'] = function () {
		if (taskList.length <= 0) {
			var deviceObj = db.device.list();
			if (deviceObj) {
				for (var i in deviceObj) {
					var timetask = require('./timer')(cronJob, timeZone, db, config);
					timetask.setDeviceId(deviceObj[i].id);
					taskList.push(timetask);
				}
			} else {
				console.log(moment.utc().toDate().getTime(), "=====>", 'system task cannot start');
			}
		}
		for (var i in taskList) {
			if (!taskList[i].status()) {
				taskList[i].start();
			}
		}
	}

	method['system']['stop'] = function () {
		for (var i in taskList) {
			if (taskList[i].status()) {
				taskList[i].stop();
			}
		}
	}

	method['system']['remove'] = function (data) {
		for (var i in taskList) {
			if (taskList[i].deviceId() == data) {
				taskList[i].stop();
				taskList.splice(i, 1);
				break;
			}
		}
	}

	method['system']['update'] = function () {
		var deviceObj = db.device.list();
		if (deviceObj) {
			for (var i in deviceObj) {
				var tryAdd = true;
				for (var j in taskList) {
					if (taskList[j].deviceId() == deviceObj[i].id) {
						tryAdd = false;
					}
				}
				if (tryAdd) {
					var timetask = require('./timer')(cronJob, timeZone, db, config);
					timetask.setDeviceId(deviceObj[i].id);
					taskList.push(timetask);
				}
			}
		} else {
			console.log(moment.utc().toDate().getTime(), "=====>", 'system task cannot update');
		}
	}

	method.system.start();

	return method;
};
