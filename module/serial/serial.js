module.exports = function (db, config) {

	var method = {};
	var moment = require('moment');
	var connectStatus = false;

	method['send'] = function (deid, command) {
		var deviceObj = db.device.getById(deid);
		if (deviceObj && config.command[command] && config.housecode[deviceObj.housecode] && config.keycode[deviceObj.keycode]) {
<<<<<<< HEAD
			serial.write(deviceObj.housecode + " " + deviceObj.keycode + " " + config.command[command]);
			console.log(moment.utc().toDate().getTime(), "=====>", deviceObj.id, deviceObj.housecode, deviceObj.keycode, command);
=======
			connectStatus = false;
			console.log(moment.utc().toDate().getTime(), "=====>", "start send", deviceObj.id, deviceObj.housecode, deviceObj.keycode, command);
			var connectSerial = function () {
				var serialport = require("serialport");
				var SerialPort = serialport.SerialPort;
				serialport.list(function (err, ports) {
					var portName = [];
					ports.forEach(function (port) {
						if (port.comName.indexOf('COM') > -1) {
							portName.push(port.comName);
						}
					});
					if (portName.length > 0) {
						for (var i in portName) {
							if (!connectStatus) {
								connectStatus = true;
								var sp = new SerialPort(portName[i], {
										baudrate : 9600,
										parser : serialport.parsers.readline("\n")
									});
								sp.open(function (error) {
									if (error) {
										sp.close(function () {
											//console.log('error', connectStatus);
											if (connectStatus) {
												connectStatus = false;
												reConnectSerial();
											}
										});
									} else {
										sp.write(deviceObj.housecode + " " + deviceObj.keycode + " " + config.command[command]);
										sp.close(function () {
											console.log(moment.utc().toDate().getTime(), "=====>", "send complete !");
										});
									}

								});
							}
						}
					} else {
						reConnectSerial();
					}
				});
			}

			var reConnectSerial = function () {
				//console.log('reConnectSerial');
				setTimeout(function () {
					connectSerial();
				}, 2000);
			};
			
			connectSerial();
>>>>>>> origin/master
		}

	};

	return method;

};
