var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
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

var transporter = nodemailer.createTransport('smtps://chris@etchedinstonestudios.com:TheCanadianMaker@smtp.gmail.com');



// mailer.extend(app, {
//   from: 'chris@thecanadianmaker.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 587, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: 'chris@etchedinstonestudios.com',
//     pass: 'TheCanadianMaker'
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

    var mailOptions = {
        from: '"Chris Ziraldo" <chris@thecanadianmaker.com>', // sender address
        to: req.body.data, // list of receivers
        subject: 'There is someone at the door for you'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

});

app.listen(6969, function() {
    console.log('Door Server listening on port 6969!');
});

app.use(express.static('public'));

module.exports = app;