const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.send('login successfull');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('You are logged out');
    });
}
