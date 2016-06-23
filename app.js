var bodyparser = require('body-parser');
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var models = require('./models');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn off swig's caching
swig.setDefaults({cache: false});

app.use(express.static('public'));

app.use('/', require('./routes'));

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
