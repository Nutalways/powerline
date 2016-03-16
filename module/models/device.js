module.exports = function (db, config) {
	var method = {};

	method['list'] = function () {
		return JSON.parse(JSON.stringify(db.object.device));
	};
	method['getById'] = function (id) {
		return db('device').getById(id);
	};
	method['updateById'] = function (data) {
		return db('device').updateById(data.id, data);
	};
	method['removeById'] = function (id) {
		return db('device').removeById(id);
	};

	method['create'] = function (data) {
		/*
		data = { name: '', type: ''};
		 */
		var deviceId = undefined;
		if (data.name && data.type && data.housecode && data.keycode) {
			var device = JSON.parse(JSON.stringify(config.db.device));
			device.name = data.name;
			device.type = data.type;
			device.value = 0;
			if(data.type == 'air conditioner'){
				device.value = 18;
			}else if(data.type == 'lamp'){
				device.value = 50;
			}
			device.housecode = data.housecode;
			device.keycode = data.keycode;
			device.status = false;
			deviceId = db('device').insert(device).id;
		}
		return deviceId ? true : false;
	};

	return method;
}
