module.exports = function(app, ensureAuthorized, db, config) {

    app.get('/login', ensureAuthorized,  function(req, res) {
        res.render('user/login', { title: '9ostrd' });
    });

};
