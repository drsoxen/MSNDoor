var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser')
var fs = require('fs');

var Info = JSON.parse(fs.readFileSync(__dirname + '/info.json', 'utf8'));

app.set('views', __dirname + '/pug')
app.set('view engine', 'pug');
app.use(bodyParser.json());

var CurrentOnlineDoors = [];

var SystemInfo = {
    tenants: Info.Tenants
}

app.get('/', function(req, res) {
    res.render('index', {SystemInfo});
});

app.get('/health-check', function(req, res) {
    res.end('True');
});

app.post('/email', function(req, res) {
	console.log(req.body);
});

app.listen(6969, function() {
    console.log('Door Server listening on port 6969!');
});

app.use(express.static('public'));

module.exports = app;