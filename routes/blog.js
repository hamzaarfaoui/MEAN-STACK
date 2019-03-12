const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    router.post('/newBlog', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: "Entrer un titre" });
        } else {
            if (!req.body.body) {
                res.json({ success: false, message: "Entrer un contenu" });
            } else {
                if (!req.body.createdBy) {
                    res.json({ success: false, message: "Entrer Le nom de l'auteur" });
                } else {
                    const blog = new Blog({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy,
                    });
                    blog.save((err) => {
                        if (err) {
                            if (err.errors) {
                                if (err.errors.title) {
                                    res.json({ success: false, message: err.errors.title.message });
                                } else {
                                    if (err.errors.title) {
                                        res.json({ success: false, message: err.errors.title.message });
                                    } else {
                                        res.json({ success: false, message: err.errmsg });
                                    }
                                }
                            } else {
                                res.json({ success: false, message: "Erreur : " + err });
                            }
                        } else {
                            res.json({ success: true, message: "Le blog " + req.body.title + " a été ajouté" });
                        }
                    });
                }
            }
        }
    });

    return router;
}