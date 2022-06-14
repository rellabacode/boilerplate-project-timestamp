// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:timestamp(\\d{1,})",
    function (req, res) {
        let date = new Date(parseInt(req.params.timestamp));
        if (date.toString() === "Invalid Date") {
            res.json({error: "Invalid Date"});
        } else {
            res.json({unix: date.valueOf(), utc: date.toUTCString()});
        }
    });

app.get("/api/:date_string",
    function (req, res) {
        if (!req.params.date_string) {
            res.json({unix: Date.now(), utc: Date()});
        }

        date = new Date(req.params.date_string);

        if (date.toString() === "Invalid Date") {
            res.json({error: "Invalid Date"});
        } else {
            res.json({unix: date.valueOf(), utc: date.toUTCString()});
        }
    });

app.get("/api/",
    function (req, res) {
        res.json({unix: Date.now(), utc: Date()});
    });

// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
