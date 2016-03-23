module.exports = function (db, config) {

	var method = {};
	var moment = require('moment');


	method['send'] = function (deid, command) {
		var deviceObj = db.device.getById(deid);
		if (deviceObj && config.portName != "" && config.command[command] && config.housecode[deviceObj.housecode] && config.keycode[deviceObj.keycode]) {
			console.log(moment.utc().toDate().getTime(), "=====>", "start send", deviceObj.id, config.housecode[deviceObj.housecode], config.keycode[deviceObj.keycode], command);
			//SerialPort.write(deviceObj.housecode + " " + deviceObj.keycode + " " + config.command[command]);
			var serialport = require("serialport");
			var SerialPort = serialport.SerialPort;
			console.log('=====>', 'serial port', config.portName);
			var sp = new SerialPort(config.portName, {
				baudrate: 9600,
				parser: serialport.parsers.readline("\n")
			}, false);
			sp.open(function(error) {
				if (error) {
					sp.close(function() {
						console.log('error', error);
					});
				} else {
					sp.write(config.housecode[deviceObj.housecode] + " " + config.keycode[deviceObj.keycode] + " " + config.command[command]);
					sp.close(function() {
						console.log('=====>', 'send serialport complete !');
					});
				}
			});
		}else{
			console.log('=====>', 'send serialport error !');
		}
	};

	return method;

};
