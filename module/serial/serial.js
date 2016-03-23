module.exports = function(db, config) {

  var method = {};
  var moment = require('moment');


  method['send'] = function(deid, command) {
    var deviceObj = db.device.getById(deid);
    if (deviceObj && config.portName != "" && config.command[command] && config.housecode[deviceObj.housecode] && config.keycode[deviceObj.keycode]) {
      console.log(moment.utc().toDate().getTime(), "=====>", "start send", deviceObj.id, config.housecode[deviceObj.housecode], config.keycode[deviceObj.keycode], config.command[command]);
      //SerialPort.write(deviceObj.housecode + " " + deviceObj.keycode + " " + config.command[command]);
      var serialport = require("serialport");
      var SerialPort = serialport.SerialPort;
      console.log('=====>', 'serial port', config.portName);
      var sp = new SerialPort(config.portName, {
        baudrate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
      }, false);

      sp.open(function(error) {
        if (error) {
          sp.close(function() {
            console.log('error', error);
          });
        } else {
          var bufdata = config.housecode[deviceObj.housecode] + " " + config.keycode[deviceObj.keycode] + " " + config.command[command];
          console.log('=====>', 'data', bufdata);
          sp.write(bufdata, function(error) {
            if (error) {
              sp.close(function() {
                console.log('error', error);
              });
            } else {
              sp.close(function() {
                console.log('=====>', 'send serialport complete !');
              });
            }
          });
        }
      });
    } else {
      console.log('=====>', 'send serialport error !');
    }
  };

  return method;

};
