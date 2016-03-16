module.exports = function(io, socket, db, config) {
    
    socket.on('remote', function(data) {
      db.device.updateById(data);
    });
	
	socket.on('timer', function(data) {
      db.timer.update(data);
    });
};
