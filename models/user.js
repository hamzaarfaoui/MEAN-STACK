const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLenghChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 15 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

let usernameLenghChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 5 || username.length > 20) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsernameChecker = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[A-Za-z0-9]+$/);
        return regExp.test(username);
    }
};

let passwordLenghChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

const emailValidators = [{
        validator: emailLenghChecker,
        message: 'Adresse mail doit contenir au moins 15 caractéres et au max 30 caractéres'
    },
    {
        validator: validEmailChecker,
        message: 'Veuillez sasir une adresse mail valide'
    }
];

const usernameValidators = [{
        validator: usernameLenghChecker,
        message: 'Username doit contenir au moins 5 caractéres et au max 20 caractéres'
    },
    {
        validator: validUsernameChecker,
        message: 'Le username doit contenir que des lettres et des chiffres'
    }
];

const passwordValidators = [{
    validator: passwordLenghChecker,
    message: 'Le mot de passe doit contenir au moins 8 caractéres et au max 35 caractéres'
}];

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);