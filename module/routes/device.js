module.exports = function(app, ensureAuthorized, db, config) {

  app.get('/home', ensureAuthorized, function(req, res) {
    var list = db.device.list();
    res.render('device/home', {
      list: list
    });
  });

  app.get('/home/device/:id/info', ensureAuthorized, function(req, res) {
    var id = req.params.id;
    console.log(id);
    if (id) {
      var device = db.device.getById(id);
      if (device) {
        res.render('device/device', {
          device: device
        });
        return;
      }
    }
    res.send(404);
  });

  app.get('/home/device/add', ensureAuthorized, function(req, res) {
    res.render('device/add');
  });
  app.post('/home/device/add', ensureAuthorized, function(req, res) {
    var name = req.body.devicename;
    var type = req.body.devicetype;
    if (name && type) {
      var device = db.device.create({
        name: name,
        type: type
      });
      if (device) {
        res.redirect('/home');
        return;
      }
    }
    res.render('device/add', {
      errMesg: 'login fail !'
    });
  });


};
