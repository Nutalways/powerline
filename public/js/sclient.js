var socket = io('http://' + window.location.host);

function remote(id, logic) {
	socket.emit('remote', {
		id : id,
		status : logic
	});
}

function timmer(id, logic) {
	socket.emit('timer', {
		id : id,
		status : logic
	});
}
