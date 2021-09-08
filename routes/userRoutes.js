module.exports = (app) => {
    app.get('/api/user', (req, res) => {
        if(req.user) res.send(req.user);
        else res.send({'Note': 'user not authenticated'});
    })
}