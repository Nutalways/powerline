var socket = io('http://' + window.location.host);
console.log(window.location.host);

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

function updateValueAir(id, val) {
	socket.emit('updateValue', {
		id : id,
		value : val
	});
}

function updateValueLamp(id, val) {
	document.getElementById(id).innerHTML=val;
	socket.emit('updateValue', {
		id : id,
		value : val
	});
}


