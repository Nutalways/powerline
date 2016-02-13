module.exports = function(app, ensureAuthorized, db, config) {

    app.get('/login', ensureAuthorized,  function(req, res) {
        res.render('user/login', { title: 'login' });
    });

    app.get('/register', ensureAuthorized,  function(req, res) {
        res.render('user/register', { title: 'register' });
    });

    app.get('/forget', ensureAuthorized,  function(req, res) {
        res.render('user/forget', { title: 'forget' });
    });

    app.get('/home', ensureAuthorized,  function(req, res) {
        res.render('user/home', { title: 'home' });
    });

    app.get('/home/time', ensureAuthorized,  function(req, res) {
        res.render('user/time', { title: 'time' });
    });

    app.get('/home/device', ensureAuthorized,  function(req, res) {
        res.render('user/device', { title: 'device' });
    });
    app.get('/home/time/add', ensureAuthorized,  function(req, res) {
        res.render('user/addtime', { title: 'addtime' });
    });

    app.get('/home/time/edit', ensureAuthorized,  function(req, res) {
        res.render('user/edittime', { title: 'edittime' });
    });

    app.get('/profile', ensureAuthorized,  function(req, res) {
        res.render('user/profile', { title: 'profile' });
    });

};
