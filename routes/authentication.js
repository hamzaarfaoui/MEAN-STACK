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
                            if(err.code == 11000){
                                res.json({ success: false, message: 'Email or username exist'});
                            }else{
                                if(err.errors){
                                    if(err.errors.email){
                                        res.json({ success: false, message: err.errors.email.message});
                                    }else{
                                        if(err.errors.username){
                                            res.json({ success: false, message: err.errors.username.message});
                                        }else{
                                            if(err.errors.password){
                                                res.json({ success: false, message: err.errors.password.message});
                                            }
                                        }
                                    }
                                }else{
                                    res.json({ success: false, message: 'Impossible de créer l utilisateur : ', err });   
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Utilisateur créer' });
                        }

                    });
                }
            }
        }

    });
    return router;
}