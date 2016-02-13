module.exports = function(app, ensureAuthorized, db, config) {

  app.get('/home', ensureAuthorized, function(req, res) {
    var list = db.device.list();
    res.render('device/home', {
      list: list
    });
  });

};
