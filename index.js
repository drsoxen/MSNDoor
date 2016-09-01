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
        for (i = 0; i < SystemInfo.doors.length; i++) 
        {
            if(SystemInfo.doors[i].id == req.body.CtrlID)
                SystemInfo.doors.splice(i, 1);
        }

        var doorName;
        for (i = 0; i < Info.Doors.length; i++) 
        {
            if(req.body.CtrlID == Info.Doors[i].id)
                doorName = Info.Doors[i].name;
        }

        SystemInfo.doors.push({id: doorName, ip:req.body.IP});
        
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
                
            }
        }

        if(user)
        {
            var CtrlID;
            for (i = 0; i < Info.Doors.length; i++) 
            {
                if(req.body.CtrlID == Info.Doors[i].id)
                    CtrlID = Info.Doors[i];
            }

            LogEvent(user,CtrlID);

            res.end(JSON.stringify({"Access": "true", "RTTTL": user.rtttl}));
        }
        else
        {
            LogEvent('Failed attempt');
            res.end(JSON.stringify({"Access": "false", "RTTTL": "NULL"}));
        }

    }
});

function LogEvent(user, CtrlID)
{
    SystemInfo.log.unshift({time: moment().format('MMMM Do YYYY, h:mm:ss a'), name: user.name, ctrlID: CtrlID.name});
}


app.post('/', function(req, res) {

});


app.listen(6969, function() {
    console.log('Door Server listening on port 6969!');
});

app.use(express.static('public'));


module.exports = app;



// webClient.DownloadFile("http://192.168.1.244/image.jpg", @"C:\Users\Chris\Desktop\Carson\Server\Carson\Carson\bin\Debug\images\" + token + ".jpg");