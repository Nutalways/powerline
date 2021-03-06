module.exports = function (http, db, serial, task, config) {
	var fs = require('fs');
	var io = require('socket.io')(http);
	io.on('connection', function (socket) {
		socket.on('remote', function (data) {
			db.device.updateById(data);
			serial.serial.send(data.id, data.status ? 'on' : 'off');
		});

		socket.on('timer', function (data) {
			db.timer.update(data);
			//console.log(data.status);
			if(data.status){
				task.system.update();
			}else{
				task.system.remove(data.id);
			}
		});

		socket.on('updateValue', function (data) {
			db.device.updateById(data);
		});
	});
};
