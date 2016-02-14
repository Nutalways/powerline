module.exports = function(db, config) {
  var method = {};

  method['list'] = function() {
    return db.object.device;
  };

  method['getById'] = function(id) {
    return db('device').getById(id);
  };

  method['create'] = function(data) {
    /*
      data = { name: '', type: ''};
    */
    var deviceId = undefined;
    if (data.name && data.type) {
      var device = JSON.parse(JSON.stringify(config.db.device));
      device.name = data.name;
      device.type = data.type;
      device.value = 0;
      device.status = false;
      deviceId = db('device').insert(device).id;
    }
    return deviceId ? true : false;
  };

  return method;
}
