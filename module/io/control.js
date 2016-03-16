module.exports = function (io, socket, db, serial, config) {

	socket.on('remote', function (data) {
		db.device.updateById(data);
		serial.serial.send(data.id, data.status ? 'on' : 'off');
	});

	socket.on('timer', function (data) {
		db.timer.update(data);
	});

	socket.on('updateValue', function (data) {
		db.device.updateById(data);
	});

};
