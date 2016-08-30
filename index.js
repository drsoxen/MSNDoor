var express = require('express');
var app = express();
app.set('views', __dirname + '/pug')
app.set('view engine', 'pug');

var fs = require('fs');
var Info = JSON.parse(fs.readFileSync(__dirname + '/info.json', 'utf8'));

var bodyParser = require('body-parser')


app.use(bodyParser.json());

var CurrentOnlineDoors = [];

var SystemInfo = {
    users: Info.Users,
    doors: [],
    log: []
}

app.get('/', function(req, res) {
    res.render('index', {SystemInfo});
});

app.get('/health-check', function(req, res) {
    res.end('True');
});

app.post('/postEndpoint', function(req, res) {
    console.log(req.body);

    res.removeHeader('Connection');
    res.removeHeader('Content-Length');
    res.removeHeader('Content-Type');
    res.removeHeader('Date');
    res.removeHeader('X-Powered-By');
    res.removeHeader('Transfer-encoding');

    if(req.body.Type == 'Init')
    {
        SystemInfo.doors.push({id: req.body.CtrlID, ip:req.body.IP});
        
        res.end(JSON.stringify({"AccessLvl": "1"}));
    }
    else if(req.body.Type == 'Auth')
    {
        var user = null;
        for (i = 0; i < Info.Users.length; i++) 
        {
            if(req.body.ID == Info.Users[i].id)
            {
                user = Info.Users[i];
                console.log(Info.Users[i].name)
                SystemInfo.log.push(Info.Users[i].name);
            }
        }

        if(user)
            res.end(JSON.stringify({"Access": "true", "RTTTL": user.rtttl}));
        else
            res.end(JSON.stringify({"Access": "false", "RTTTL": "NULL"}));

    }
});


app.post('/', function(req, res) {

});


app.listen(6969, function() {
    console.log('Door Server listening on port 6969!');
});

app.use(express.static('public'));


module.exports = app;