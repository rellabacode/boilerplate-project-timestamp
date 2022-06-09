// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// Your own super cool function
// var logger = function(req, res, next) {
//     console.log("GOT REQUEST ! "+ req.url);
//     next(); // Passing the request to the next handler in the stack.
// }

// app.use(logger); // Here you add your logger to the stack.

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

app.get("/api/:unix(\\d{1,})", function (req, res) {
    console.log(req.params);
    var date = (req.params.unix ? new Date(parseInt(req.params.unix)) : new Date());

    if (date instanceof Date && !isNaN(date.valueOf())) {
        res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
    return res.json({error: "Invalid Date"});
});

app.get("(/api|/api/(:year(19[7-9][0-9]|[2-9][0-9][0-9][0-9])-:month(0[1-9]|1[0-2])-:day(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
    "(T:hour(0[0-9]|1[0-9]|2[0-3])\::minute(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])\::second(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])" +
    "(\.[0-9]{3}[+-]:zhour(0[0-9]|1[0-9]|2[0-4])::zmin(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))?)?)?)?|/api/:dateString",
    function (req, res) {

        console.log(req.params);

        if (req.params.year === undefined && req.params.hour === undefined) {
            let current = new Date();
            return res.json({unix: current.getTime(), utc: current.toUTCString()});
        }

        let milliseconds = (req.params.hour ?
            Date.UTC(req.params.year, req.params.month - 1, req.params.day, req.params.hour, req.params.minute, req.params.second) :
            Date.UTC(req.params.year, req.params.month - 1, req.params.day));

        let date = new Date(milliseconds);
        if (date instanceof Date && !isNaN(date.valueOf())) {
            res.json({unix: date.getTime(), utc: date.toUTCString()});
        }
        return res.json({error: "Invalid Date"});
    });

// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
