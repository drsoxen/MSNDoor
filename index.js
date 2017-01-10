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

var transporter = nodemailer.createTransport('smtps://msndoor%40gmail.com:makerspace@smtp.gmail.com');

// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'chris@etchedinstonestudios.com',
//         pass: 'TheCanadianMaker'
//     }
// });

var SystemInfo = {
    tenants: Info.Tenants
}

app.post('/email', function(req, res) {
    console.log(req.body.data);

    transporter.sendMail({
      from: 'msndoor@gmail.com',
      to: req.body.data,
      subject: 'There is someone at the door for you',
      text: ''
    }, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

});

app.get('/', function(req, res) {
    res.render('index', {SystemInfo:SystemInfo});
});

app.get('/health-check', function(req, res) {
    res.end('True');
});

app.listen(6969, function() {
    console.log('Door Server listening on port 6969!');
});

app.use(express.static('public'));

module.exports = app;