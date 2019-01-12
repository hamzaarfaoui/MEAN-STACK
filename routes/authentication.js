const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        //req.body.email;
        //req.body.username;
        //req.body.password;
        if (!req.body.email) {
            res.json({ success: false, message: 'Vous devez entrer un email' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'Vous devez entrer un username' });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'Vous devez entrer un mot de passe' });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: 'Impossible de créer l utilisateur : ', err });
                        } else {
                            res.json({ success: true, message: 'Utilisateur créer' });
                        }
                    });
                    res.json({ success: true, message: 'Bienvenu' });
                }
            }
        }

    });
    return router;
}