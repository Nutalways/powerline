module.exports = function (db, serial, config) {

	var method = {};
	var moment = require('moment');

	method['send'] = function (deid, command) {
		var deviceObj = db.device.getById(deid);
		if (deviceObj) {
			serialPort.write(deviceObj.housecode + " " + deviceObj.keycode + " " + config.command[command]);
			console.log(moment.utc().toDate().getTime(), "=====>", deviceObj.id, deviceObj.housecode, deviceObj.keycode, command);
		}
	};

	return method;

};
