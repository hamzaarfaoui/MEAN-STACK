const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    // start register
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
                            if (err.code == 11000) {
                                res.json({ success: false, message: 'Email or username exist' });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message });
                                            }
                                        }
                                    }
                                } else {
                                    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                                    res.json({ success: false, message: 'Impossible de créer l utilisateur : ', err });
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Utilisateur créer', token, token, user: { username: user.username } });
                        }

                    });
                }
            }
        }

    });
    //end register

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'Adresse e-mail n\'a pas été fourni' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail déja existe' });
                    } else {
                        res.json({ success: true, message: 'Vous pouvez utiliser cette adresse e-mail' });
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username n\'a pas été fourni' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username déja existe' });
                    } else {
                        res.json({ success: true, message: 'Vous pouvez utiliser ce username' });
                    }
                }
            });
        }
    });

    //start login
    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'Vous devez entrer un username' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'Vous devez entrer un mot de passe' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: "Username incorrect" });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: "Mot de passe incorrect" });
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                                res.json({ success: true, message: "Succes !!", token: token, user: { username: user.username } });
                            }
                        }
                    }
                });
            }
        }
    });
    //end login

    // router.use((req, res, next) => {
    //     const token = req.headers['authorization'];
    //     if (!token) {
    //         res.json({ success: false, message: "Aucun token trouvé" });
    //     } else {
    //         jwt.verify(token, config.secret, (err, decoded) => {
    //             if (err) {
    //                 res.json({ success: false, message: "Token invalid : " + err });
    //             } else {
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //         });
    //     }
    // });

    //start profile
    router.get('/profile', (req, res) => {
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: "Aucun utilisateur" });
                } else {
                    res.json({ success: true, user: user });
                }
            }
        });
    });
    //end profile

    return router;
}