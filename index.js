var express = require('express');
var app = express();
var mailer = require('express-mailer');
var moment = require('moment');
var bodyParser = require('body-parser')
var fs = require('fs');

var Info = JSON.parse(fs.readFileSync(__dirname + '/info.json', 'utf8'));

app.set('views', __dirname + '/pug')
app.set('view engine', 'pug');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// mailer.extend(app, {
//   from: 'no-reply@example.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: 'gmail.user@gmail.com',
//     pass: 'userpass'
//   }
// });

var CurrentOnlineDoors = [];

var SystemInfo = {
    tenants: Info.Tenants
}

app.get('/', function(req, res) {
    res.render('index', {SystemInfo:SystemInfo});
});

app.get('/health-check', function(req, res) {
    res.end('True');
});

app.post('/email', function(req, res) {
	console.log(req.body.data);

	// app.mailer.send('email', {
 //    to: req.body.data, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
 //    subject: 'Someone is at the door', // REQUIRED.
 //    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
 //  }, function (err) {
 //    if (err) {
 //      // handle error
 //      console.log(err);
 //      res.send('There was an error sending the email');
 //      return;
 //    }
 //    res.send('Email Sent');
 //  });
});

app.listen(6969, function() {
    console.log('Door Server listening on port 6969!');
});

app.use(express.static('public'));

module.exports = app;