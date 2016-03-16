module.exports = function (db, config) {

	var method = {};
	var moment = require('moment');

	method['send'] = function (deid, command) {
		var deviceObj = db.device.getById(deid);
		if (deviceObj) {
			console.log(moment.utc().toDate().getTime(), "=====>", deviceObj.id, deviceObj.housecode, deviceObj.keycode, command);
		}
	};

	return method;

};
