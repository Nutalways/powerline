module.exports = function(app, ensureAuthorized, db, config) {

  app.get('/home', ensureAuthorized, function(req, res) {
    res.render('device/home', {
      title: 'home'
    });
  });

};
