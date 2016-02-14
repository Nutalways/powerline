module.exports = function(app, ensureAuthorized, db, config) {
  app.get('/', function(req, res) {
    res.redirect('/login');
  });
  app.get('/login', function(req, res) {
    res.render('user/login');
  });
  app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
      var user = db.user.auth({
        email: username,
        password: password
      });
      if (user) {
        req.session.user = user;
        res.redirect('/home');
        return;
      }
    }
    res.render('user/login', {
      errMesg: 'login fail !'
    });
  });
  app.get('/logout', ensureAuthorized, function(req, res) {
    delete req.session.user;
    res.redirect('/login');
  });

  app.get('/register', ensureAuthorized, function(req, res) {
    res.render('user/register', {
      title: 'register'
    });
  });

  app.get('/forget', ensureAuthorized, function(req, res) {
    res.render('user/forget', {
      title: 'forget'
    });
  });



  app.get('/home/time', ensureAuthorized, function(req, res) {
    res.render('user/time', {
      title: 'time'
    });
  });


  app.get('/home/time/add', ensureAuthorized, function(req, res) {
    res.render('user/addtime', {
      title: 'addtime'
    });
  });

  app.get('/home/time/edit', ensureAuthorized, function(req, res) {
    res.render('user/edittime', {
      title: 'edittime'
    });
  });

  app.get('/profile', ensureAuthorized, function(req, res) {
    res.render('user/profile', {
      title: 'profile'
    });
  });

};
