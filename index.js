const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err){
    console.log('Impossible de connecté à la bases de données', err);
  }else{
    console.log('Connecté à la base de données ' + config.db);
  }
}, {useNewUrlParser: true});

app.get('/', (req, res) => {
    res.send('hello wfefefeféorld');
  });
  
  app.listen(8080, ()=>{
    console.log('Lestinning on port 8080');
  });