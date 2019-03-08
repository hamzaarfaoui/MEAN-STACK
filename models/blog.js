const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let titleLenghChecker = (title) => {
    if (!title) {
        return false;
    } else {
        if (title.length < 15 || title.length > 50) {
            return false;
        } else {
            return true;
        }
    }
};

let alphaNumericTitleChecker = (title) => {
    if (!title) {
        return false;
    } else {
        const regExp = new RegExp(/^([a-zA-Z0-9 ])+$/);
        return regExp.test(title);
    }
};

let bodyLenghChecker = (body) => {
    if (!body) {
        return false;
    } else {
        if (body.length < 5 || body.length > 500) {
            return false;
        } else {
            return true;
        }
    }
};

let commentLenghChecker = (comment) => {
    if (!comment[0]) {
        return false;
    } else {
        if (comment[0].length < 1 || comment[0].length > 200) {
            return false;
        } else {
            return true;
        }
    }
};

const titleValidators = [{
        validator: titleLenghChecker,
        message: 'Le titre doit contenir au moins 15 caractéres et au max 50 caractéres'
    },
    {
        validator: alphaNumericTitleChecker,
        message: 'Le titre doit étre alphanumeric'
    }
];

const bodyValidators = [
    {
        validator: bodyLenghChecker,
        message: 'Le contenu doit contenir au moins 5 caractéres et au max 500 caractéres'
    }
];

const commentValidators = [{
    validator: commentLenghChecker,
    message: 'Le commentaire doit contenir au moins 1 caractéres et au max 2OO caractéres'
}];

const blogSchema = new Schema({
    title: { type: String, required: true, validate: titleValidators },
    body: { type: String, required: true, validate: bodyValidators },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array },
    comments: [{
        comment: { type: String, validate: commentValidators },
        commentator: { type: String }
    }]
});




module.exports = mongoose.model('Blog', blogSchema);