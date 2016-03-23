module.exports = function(db, config) {
  var method = {};
  var fs = require('fs');
  var connectStatus = false;

  var connectSerial = function() {
		console.log("=====>", "start connectSerial");
		var serialport = require("serialport");
		var SerialPort = serialport.SerialPort;
    serialport.list(function(err, ports) {
      var portName = [];
      ports.forEach(function(port) {
        if (port.comName.indexOf('COM') > -1) {
          portName.push(port.comName);
        }
      });
      if (portName.length > 0) {
        for (var i in portName) {
          if (!connectStatus) {
						console.log("=====>", portName[i]);
            connectStatus = true;
            var sp = new SerialPort(portName[i], {
              baudrate: 9600,
              parser: serialport.parsers.readline("\n")
            }, false);
            sp.open(function(error) {
              if (error) {
                sp.close(function() {
                  console.log('error', error, connectStatus);
                  if (connectStatus) {
                    connectStatus = false;
                    reConnectSerial();
                  }
                });
              } else {
								config.portName = portName[i];
								sp.close(function() {
                  console.log('=====>', 'get serialport complete !');
                  if (connectStatus) {
                    connectStatus = false;
                    reConnectSerial();
                  }
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

  var reConnectSerial = function() {
    //console.log('reConnectSerial');
    setTimeout(function() {
      connectSerial();
    }, 10000);
  };

  connectSerial();

	fs.readdirSync(__dirname).forEach(function(file) {
		if (file == "index.js")
			return;
		var name = file.substr(0, file.indexOf('.'));
		method[name] = require('./' + name)(db, config);
	});

  return method;
};
