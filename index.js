const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blog')(router);
const bodyParser = require('body-parser');
const cors = require('cors');




app.use(cors({
    origin: 'http://localhost:4200'
}));

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Impossible de connecté à la bases de données', err);
    } else {
        console.log('Connecté à la base de données ' + config.db);
    }
}, { useNewUrlParser: true });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(8080, () => {
    console.log('Lestinning on port 8080');
});